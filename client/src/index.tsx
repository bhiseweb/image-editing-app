import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootSaga from './sagas/index'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers/index'
const sagaMiddleware = createSagaMiddleware()


const store = createStore(
    combineReducers,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
