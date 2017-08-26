import Immutable from 'immutable'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from '../redux/reducers'

export function createMtgxStore () {
  const initialState = Immutable.Map()
  const middlewares = [thunk]

  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))

  return store
}