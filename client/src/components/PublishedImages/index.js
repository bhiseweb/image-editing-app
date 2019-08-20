import React, { Component } from "react"
import { connect } from 'react-redux'
import { onImageGet } from '../../action/addImage'

class PublishedImages extends Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount () {
    this.props.onImageGet()
  }
  render() {
    return (
        <div>
          {this.props.images.map((image,index) => <div key={index}>{image.name}<img className='imageContainer' src={`http://localhost:4000/${image.image}`} /></div>)}
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    images: state.imageReducer.images,
  })

  
const mapDispatchToProps = {
    onImageGet,
}
 
export default connect(mapStateToProps,mapDispatchToProps)(PublishedImages);
