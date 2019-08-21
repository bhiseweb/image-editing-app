import { takeLatest, call, put } from 'redux-saga/effects'
import API from '../utils/index'
import { ON_IMAGE_GET_SUCCESS,
         ON_IMAGE_ADD_REQUEST,
         ON_IMAGE_GET_REQUEST }from '../action/actiontypes'
import { AddImageAction } from '../action/addImage';
export function* watchaddImage(){
    yield takeLatest(ON_IMAGE_ADD_REQUEST , addImage);
  }
  
  function* addImage(data: AddImageAction){
    yield call(API.add,'/images',data.payload);
  }

  export function* watchgetImage(){
    yield takeLatest(ON_IMAGE_GET_REQUEST , getImage);
  }
  
  function* getImage(data: AddImageAction){
    const payload = yield call(API.fetch,'/images');
    yield put({ type: ON_IMAGE_GET_SUCCESS, payload });
  }