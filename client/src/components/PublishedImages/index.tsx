import React, { Component, Fragment } from "react"
import { connect } from 'react-redux'
import { onImageGet } from '../../action/addImage'
import { IImageStateRedux } from '../../reducers/imageReducer'

interface ICanvasState {
}
interface ICanvasProps {
  images:[]
  onImageGet: Function
}
interface ICanvasStateToProps {
  imageReducer: IImageStateRedux
}
class PublishedImages extends Component <ICanvasProps, ICanvasState> {
  
  componentDidMount() {
    this.props.onImageGet()
  }

  render() {
    return (
      <div className="container">
        {this.props.images.map((image: any, index: number) =>
          <Fragment>
            <div className="row">
              <div className="col">
              <img className='imageContainer' src={`http://localhost:4000/${image.image}` } alt={image.name} />
              {image.name} <a className="btn btn-primary" href={`http://localhost:4000/${image.image}`} target="_blank">download</a>
              </div>
            </div>
            <hr/>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ICanvasStateToProps) => ({
  images: state.imageReducer.images,
})


const mapDispatchToProps = {
  onImageGet,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishedImages);
