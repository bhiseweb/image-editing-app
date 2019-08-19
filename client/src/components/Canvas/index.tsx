import React, { Component } from "react"
import Layout from '../Layout'
import konva from 'konva'
import KonvaImage from '../konva'
interface ICanvasState {
  file: string
}
interface ICanvasProps { }

class Canvas extends Component<ICanvasProps, ICanvasState> {
  constructor(props: ICanvasProps) {
    super(props)
    this.state = {
      file: ''
    }
  }

  public handleChange = (event: React.FormEvent<EventTarget>) => {
    const file = (event.target as HTMLInputElement).files
    const reader = new FileReader()
    if (file && file.length) {
      reader.readAsDataURL(file[0])
      reader.onload = async () => {
        this.setState({file: reader.result as string})
      }
    }
  }

  render() {
    return (
      <Layout>
        <div>
          <input type='file' name='upload' onChange={this.handleChange} />
          <KonvaImage image={this.state.file}/>
        </div>
      </Layout>
    );
  }
}

export default Canvas
