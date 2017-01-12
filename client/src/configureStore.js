import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import APODReducers from './apod/reducers'

export default function configureStore(preloadedState) {
  return createStore(
    APODReducers,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  );
}