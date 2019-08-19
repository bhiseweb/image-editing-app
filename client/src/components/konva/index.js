import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';

class KonvaImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: new window.Image()
    }
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
  
  render() {
    return (
      <Stage width={600} height={600}>
        <Layer>
          <Image
            image={this.state.image}
            draggable
            ref={node => {
              this.imageNode = node;
            }}
           />
        </Layer>
      </Stage>
    );
  }
}

export default KonvaImage;