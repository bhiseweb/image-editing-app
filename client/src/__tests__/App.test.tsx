import React from 'react';
import App from '../App';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux';
import combineReducers from '../reducers/index'
import { shallow } from 'enzyme';
const sagaMiddleware = createSagaMiddleware()

it('renders without crashing', () => {
  const store = createStore(
    combineReducers,
    applyMiddleware(sagaMiddleware)
  )
  shallow(
    <Provider store={store}>
      <App />
    </Provider>
  )
});
