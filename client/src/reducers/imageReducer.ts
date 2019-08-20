import {
  ON_IMAGE_ADD_SUCCESS, ON_IMAGE_GET_SUCCESS,
} from '../action/actiontypes'
import { AddImageAction } from '../action/addImage'

export interface IImageStateRedux {
  image: any,
  images: any
}

const initialState = { image: [], images: [] }

export default function imageReducer(state = initialState, action: AddImageAction): IImageStateRedux {
  switch (action.type) {
    case ON_IMAGE_ADD_SUCCESS:
      return {
        ...state,
        image: action.payload.data,
      }
    case ON_IMAGE_GET_SUCCESS:
      return {
        ...state,
        images: action.payload.data,
      }
    default:
      return state
  }
}

