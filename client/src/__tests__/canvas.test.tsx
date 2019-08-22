import {  shallow } from 'enzyme';
import * as React from 'react';
import Layout from '../components/Layout'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import Canvas from '../components/Canvas'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import combineReducers from '../reducers/index'
const sagaMiddleware = createSagaMiddleware()

it('Canvas Page renders without crashing', () => {
    const store = createStore(
        combineReducers,
        applyMiddleware(sagaMiddleware)
      )
  shallow(
    <Provider store={store}>
      </Provider>
    ).contains(
    <div className='ImageUpload'>
    <Layout>
      <div>
        <input type='file' name='upload' />
        <Button variant="primary" >Publish</Button>
        <Link to="/images">
        <Button className='ShowImages' variant="primary" >
          Show Images
        </Button>
        </Link>
      </div>
    </Layout>
    </div>
  );
});