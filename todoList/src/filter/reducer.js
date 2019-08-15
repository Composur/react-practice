import {SET_FILTER} from './actionTypes'
import {FilterTypes} from '../../src/constants'

export default (state=FilterTypes.ALL,action)=>{
  switch(action.type){
    case SET_FILTER:
    return action.filters
    default:
    return state
  }
}