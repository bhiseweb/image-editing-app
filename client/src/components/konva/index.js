import React, { Component } from 'react';
import { Stage, Layer, Image, Transformer, Container } from 'react-konva';

class KonvaImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: new window.Image(),
      x: 50,
      y: 50,
      selected: false
    }
    this.trRef = React.createRef()
    this.imageNode = React.createRef()
    this.layer = React.createRef()
  }

  componentDidUpdate (prevprops) {
    if(prevprops!==this.props) {
      this.setImage(this.props.image)
    }
  }

  setImage = (image) => {
    const newImage = new window.Image()
    newImage.onload = () => {
      this.setState({ image: newImage })
    }
    newImage.src = image
  }

  removeSelect = e => {
    this.setState({ selected: false })
  }
  
  onSelect = e => {
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
        width={500}
        height={500}
        onMouseDown={e => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            this.removeSelect()
          }
        }} >
        <Layer ref={this.layer}>
          <Image
            x={this.state.x}
            y={this.state.y}
            name="image"
            image={this.state.image}
            draggable
            ref={this.imageNode}
            onClick={this.onSelect}
           />
           { this.state.selected && <Transformer ref={this.trRef}/> }
        </Layer>
      </Stage>
    );
  }
}

export default KonvaImage;