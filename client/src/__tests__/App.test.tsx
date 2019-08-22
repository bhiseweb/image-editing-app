import React from 'react';
import ReactDOM from 'react-dom';
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

  // const div = document.createElement('div');
  // ReactDOM.render(
    shallow(
      <Provider store={store}>
        <App />
      </Provider>
    )
// , div);
  // ReactDOM.unmountComponentAtNode(div);
});
