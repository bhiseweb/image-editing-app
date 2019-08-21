import React, { Component } from "react"
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Layout from '../Layout'
import { onImageAdd, onImageGet, onImageAddSuccess, saveTransformImage } from '../../action/addImage'
import KonvaImage from '../konva'
import { IImageStateRedux } from '../../reducers/imageReducer'
interface ICanvasState {
  file: string
  filename: string
}
interface ICanvasProps {
  onImageAdd: Function
  image: any
  onImageGet: Function
  onImageAddSuccess: Function
  saveTransformImage: Function
  imageName: string,
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number,
  scaleX: number,
  scaleY: number
}

interface ICanvasStateToProps {
  imageReducer: IImageStateRedux
}

class Canvas extends Component<ICanvasProps, ICanvasState> {
  private konvaImage: any
  constructor(props: ICanvasProps) {
    super(props)
    this.state = {
      file: '',
      filename: '',
    }

    this.konvaImage = React.createRef()
  }

  componentDidMount () {
    this.setState({filename: this.props.imageName,file: this.props.image})
  }

  componentDidUpdate (prevprops: ICanvasProps) {
    if(prevprops !== this.props )
    this.setState({filename: this.props.imageName,file: this.props.image})
  }


  public handleChange = (event: React.FormEvent<EventTarget>) => {
    const file = (event.target as HTMLInputElement).files
    const reader = new FileReader()
    if (file && file.length) {
      reader.readAsDataURL(file[0])
      reader.onload = async () => {
        const uploadImage = {
          filename: file[0].name,
          file: reader.result as string
        }
        this.props.onImageAddSuccess(uploadImage);

      }
    }
  }

  convertBaseToFile = (image: string) => {
    const byteString = atob(image.split(',')[1])
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i)
    }
    
    return new Blob([ab], {
    type: 'image/jpeg'
    })
    }

  handleClick = async (e: React.FormEvent<EventTarget>) => {
    let convertedImage
    if (this.konvaImage) {
      await this.konvaImage.current.removeSelect();
      convertedImage = await this.convertBaseToFile(this.konvaImage.current.getTransformedImage())
      const formData = new FormData()
      formData.append('avatar', convertedImage)
      this.props.onImageAdd(formData)
    }
  }

  onTransform = (x: number, y: number, width: number, height: number, rotation: number, scaleX: number, scaleY: number) => {
    const transformData = {
      x,y,width,height,rotation,scaleX,scaleY
    }
    this.props.saveTransformImage(transformData)
  }

  handleShow = (e: React.FormEvent<EventTarget>) => {
    this.props.onImageGet()
  }

  render() {
    return (
      <div className='ImageUpload'>
      <Layout>
        <div>
          <KonvaImage
            ref={this.konvaImage}
            image={this.props.image}
            x={this.props.x}
            y={this.props.y}
            width={this.props.width}
            height={this.props.height}
            rotation={this.props.rotation}
            scaleX={this.props.scaleX}
            scaleY={this.props.scaleY}
            onTransform={this.onTransform}
          />
          <input type='file' name='upload' onChange={this.handleChange} />
          <Button variant="primary" onClick={this.handleClick}>Publish</Button>
          <Link to="/images">
          <Button className='ShowImages' variant="primary" onClick={this.handleShow}>
            Show Images
          </Button>
          </Link>
        </div>
      </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state: ICanvasStateToProps) => ({
  image: state.imageReducer.image,
  imageName: state.imageReducer.imageName,
  x: state.imageReducer.x,
  y: state.imageReducer.y,
  width: state.imageReducer.width,
  height: state.imageReducer.height,
  rotation: state.imageReducer.rotation,
  scaleX: state.imageReducer.scaleX,
  scaleY: state.imageReducer.scaleY,
})


const mapDispatchToProps = {
  onImageAdd,
  onImageGet,
  onImageAddSuccess,
  saveTransformImage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
