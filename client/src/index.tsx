import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import rootSaga from './sagas/index'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers/index'
const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  version: 0,
  storage,
  whitelist: ['imageReducer']
}
const persistedReducer = persistReducer(persistConfig, combineReducers)

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
)

let persistor = persistStore(store)

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>, document.getElementById('root'));
