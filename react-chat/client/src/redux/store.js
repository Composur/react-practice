/**
 * store的写法比较固定
 */

 import {createStore,applyMiddleware} from 'redux'
 import chunk from 'redux-thunk'
 import {composeWithDevTools} from 'redux-devtools-extension'
 import AppReducers from './reducers'


 export default createStore(AppReducers,composeWithDevTools(applyMiddleware(chunk)))
