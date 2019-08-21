import { ON_IMAGE_ADD_SUCCESS, 
         ON_IMAGE_ADD_REQUEST,
         ON_IMAGE_GET_SUCCESS,
         ON_IMAGE_GET_REQUEST,
         ON_IMAGE_TRANSFORM,}from './actiontypes'

 export interface AddImageAction {
   type: string
   payload: any
 }

  export const onImageAdd = (payload: any): AddImageAction => ({
    type: ON_IMAGE_ADD_REQUEST,
    payload
  })

  export const onImageAddSuccess = (payload: any): AddImageAction => ({
    type: ON_IMAGE_ADD_SUCCESS,
    payload
  })
  
  export const saveTransformImage = (payload: any): AddImageAction => ({
    type:ON_IMAGE_TRANSFORM,
    payload
  })

  export const onImageGet = (payload: any): AddImageAction => ({
    type: ON_IMAGE_GET_REQUEST,
    payload
  })

  export const onImageGetSuccess = (payload: any): AddImageAction => ({
    type: ON_IMAGE_GET_SUCCESS,
    payload
  })