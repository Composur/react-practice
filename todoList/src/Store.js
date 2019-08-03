/**
 * store的写法比较固定
 */

// import {createStore,applyMiddleware} from 'redux'
// import chunk from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import AppReducers from './reducers' //根reduce人 汇总


// export default createStore(AppReducers,composeWithDevTools(applyMiddleware(chunk)))

import {createStore,combineReducers} from 'redux'
import {reducer as filterReducer} from './filter'
import {reudcer as todoReducer} from './todoList'
const rudecer=combineReducers({
  filterReducer,todoReducer
})

export default createStore(rudecer)