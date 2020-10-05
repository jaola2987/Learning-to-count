import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { keptReducer } from './reducers/kept'
import { resolveReducer } from './reducers/resolve'
import { resultReducer } from './reducers/result'


const rootReducer = combineReducers({ 
  kept: keptReducer,
  resolve: resolveReducer, 
  result: resultReducer
}) 

export default createStore(rootReducer, applyMiddleware(thunk))