import {
  ON_IMAGE_ADD_SUCCESS,
  ON_IMAGE_GET_SUCCESS,
  ON_IMAGE_TRANSFORM,
  ON_SESSION_CLEAR, } from '../action/actiontypes'
import { AddImageAction } from '../action/addImage'

export interface IImageStateRedux {
  image: any,
  images: any,
  imageName: string,
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number,
  scaleX: number,
  scaleY: number
}

const initialState = { image: [], images: [], imageName: '', x: 50, y: 50, width: 300, height: 300, scaleX: 1, scaleY: 1, rotation: 0 }

export default function imageReducer(state: IImageStateRedux = initialState, action: AddImageAction): IImageStateRedux {
  switch (action.type) {
    case ON_IMAGE_ADD_SUCCESS:
      return {
        ...state,
        image: action.payload.file,
        imageName: action.payload.filename
      }
    case ON_IMAGE_GET_SUCCESS:
      return {
        ...state,
        images: action.payload.data,
      }
    case ON_IMAGE_TRANSFORM:
      return {
        ...state,
        x: action.payload.x,
        y: action.payload.y,
        width: action.payload.width,
        height: action.payload.height,
        rotation: action.payload.rotation,
        scaleX: action.payload.scaleX,
        scaleY: action.payload.scaleY
      }
    case ON_SESSION_CLEAR:
      return {
        ...state,
        image: '',
        imageName: ''
      }
    default:
      return state
  }
}

