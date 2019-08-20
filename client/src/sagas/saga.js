import { takeLatest, call, put } from 'redux-saga/effects'
import API from '../utils/index'
import { ON_IMAGE_ADD_SUCCESS, 
         ON_IMAGE_GET_SUCCESS,
         ON_IMAGE_ADD_REQUEST,
         ON_IMAGE_GET_REQUEST }from '../action/actiontypes'
export function* watchaddImage(){
    yield takeLatest(ON_IMAGE_ADD_REQUEST , addImage);
  }
  
  function* addImage(data){
    const payload = yield call(API.add,'/images',data.payload);
    yield put({ type: ON_IMAGE_ADD_SUCCESS, payload });
  }

  export function* watchgetImage(){
    yield takeLatest(ON_IMAGE_GET_REQUEST , getImage);
  }
  
  function* getImage(data){
    const payload = yield call(API.fetch,'/images');
    yield put({ type: ON_IMAGE_GET_SUCCESS, payload });
  }