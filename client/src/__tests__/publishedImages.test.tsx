import { shallow } from 'enzyme';
import * as React from 'react';
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import combineReducers from '../reducers/index'
const sagaMiddleware = createSagaMiddleware()
import PublishedImages from '../components/PublishedImages';
import { Stage, Layer, Image, } from 'react-konva';

it('upload image to konva component ', () => {
  const store = createStore(
    combineReducers,
    applyMiddleware(sagaMiddleware)
  )
  shallow(
    <Provider store={store}>
      <PublishedImages />
    </Provider>
  ).contains(
    <Stage >
      <Layer >
        <Image {...store.getState().imageReducer.images} />
      </Layer>
    </Stage>
  );
});