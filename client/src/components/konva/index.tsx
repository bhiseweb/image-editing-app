import React, { Component } from 'react';
import { Stage, Layer, Image, Transformer } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';

interface ICanvasState {
  image: any
  x: number
  y: number
  selected: boolean
}

interface ICanvasProps {
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number,
  scaleX: number,
  scaleY: number,
  onTransform: Function
  image: any
}
class KonvaImage extends Component <ICanvasProps, ICanvasState>{
  private trRef: any
  private imageNode: any
  private layer: any
  constructor(props: ICanvasProps) {
    super(props)
    this.state = {
      image: new (window as any).Image(),
      x: 50,
      y: 50,
      selected: false
    }
    this.trRef = React.createRef()
    this.imageNode = React.createRef()
    this.layer = React.createRef()
  }

  componentDidUpdate(prevprops: ICanvasProps) {
    if (prevprops !== this.props) {
      this.setImage(this.props.image)
    }
  }

  setImage = (image: any) => {
    const newImage = new (window as any).Image()
    newImage.onload = () => {
      this.setState({ image: newImage })
    }
    newImage.src = image
  }

  removeSelect = (e: KonvaEventObject<MouseEvent>) => {
    this.setState({ selected: false })
  }

  onSelect = (e: KonvaEventObject<MouseEvent>) => {
    this.setState({ selected: true }, () => {
      this.trRef.current.setNode(this.imageNode.current);
      this.trRef.current.getLayer().batchDraw();
    })
  }

  getTransformedImage = () => {
    return this.layer.current.toDataURL({ pixelRatio: 10 })
  }
  

  render() {
    return (
      <Stage
        width={600}
        height={500}
        onMouseDown={e => {
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            this.removeSelect(e)
          }
        }} >
        <Layer ref={this.layer}>
          <Image
            x={this.props.x}
            y={this.props.y}
            width={this.props.width}
            height={this.props.height}
            rotation={this.props.rotation}
            scaleX={this.props.scaleX}
            scaleY={this.props.scaleY}
            name="image"
            image={this.state.image}
            draggable
            ref={this.imageNode}
            onClick={this.onSelect}
            onDragEnd={() => {
              if (this.imageNode) {
                debugger
                const x = this.imageNode.current.attrs.x
                const y = this.imageNode.current.attrs.y
                const width = this.imageNode.current.attrs.width
                const height = this.imageNode.current.attrs.height
                const rotation = this.imageNode.current.attrs.rotation
                const scaleX = this.imageNode.current.attrs.scaleX
                const scaleY = this.imageNode.current.attrs.scaleY

                this.props.onTransform(x, y, width, height, rotation, scaleX, scaleY)
              }
            }

            }
          />
          {this.state.selected && (
            <Transformer ref={this.trRef}
              onTransform={() => {
                debugger
                if (this.trRef) {
                  const x = this.trRef.current.node().x()
                  const y = this.trRef.current.node().y()
                  const width = this.trRef.current.node().width()
                  const height = this.trRef.current.node().height()
                  const rotation = this.trRef.current.node().rotation()
                  const scaleX = this.trRef.current.node().scaleX()
                  const scaleY = this.trRef.current.node().scaleY()

                  this.props.onTransform(x, y, width, height, rotation, scaleX, scaleY)
                }
              }
              }
            />
          )}
        </Layer>
      </Stage>
    );
  }
}

export default KonvaImage;