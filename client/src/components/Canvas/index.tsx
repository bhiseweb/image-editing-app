import React, { Component } from "react"
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Layout from '../Layout'
import { onImageAdd, onImageGet } from '../../action/addImage'
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
      filename: ''
    }

    this.konvaImage = React.createRef()
  }

  public handleChange = (event: React.FormEvent<EventTarget>) => {
    const file = (event.target as HTMLInputElement).files
    const reader = new FileReader()
    if (file && file.length) {
      reader.readAsDataURL(file[0])
      reader.onload = async () => {
        this.setState({ filename: file[0].name })
        this.setState({ file: reader.result as string })

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

  handleClick = (e: React.FormEvent<EventTarget>) => {
    let convertedImage
    if (this.konvaImage) {
      convertedImage = this.convertBaseToFile(this.konvaImage.current.getTransformedImage())
      const formData = new FormData()
      formData.append('avatar', convertedImage)
      this.props.onImageAdd(formData)
    }
  }

  handleShow = (e: React.FormEvent<EventTarget>) => {
    this.props.onImageGet()
  }
  render() {
    return (
      <Layout>
        <div>
          <input type='file' name='upload' onChange={this.handleChange} />
          <button onClick={this.handleClick}>
            publish
          </button>
          <Link to="/images">
          <button onClick={this.handleShow}>
            Show Images
          </button>
          </Link>
          <KonvaImage ref={this.konvaImage} image={this.state.file} />
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state: ICanvasStateToProps) => ({
  image: state.imageReducer.image,
})


const mapDispatchToProps = {
  onImageAdd,
  onImageGet,
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
