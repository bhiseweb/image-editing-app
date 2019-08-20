import { all } from 'redux-saga/effects'
import { watchaddImage, watchgetImage} from '../sagas/saga' 

function* rootSaga() {
  yield all([
    watchaddImage(),
    watchgetImage(),
  ])
}

export default rootSaga