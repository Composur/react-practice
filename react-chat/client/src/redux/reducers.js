/**
 * 根据老的state和和传入的actions生成新的state，一般会有多个reducer
 * 
 */

import {combineReducers} from 'redux'
import{AUTH_SUCCESS,ERROR_MSG,RECEIVE_MSG, RECEIVE_ERR} from './action-types'

import {redirectTo} from '../utils'



export function loginUserInfo(previousState = {}, action) { //管理user type=boss message err
   switch(action.type){

        case AUTH_SUCCESS:
            const {type=undefined,avatar=undefined}=action.data.payload
            return {...action.data,redirectTo:redirectTo(type,avatar)}

        case ERROR_MSG:
            return {...previousState,message:action.data}

        default:
        return previousState
        
   }
    
}


export function updateUserInfo(previousState={},action){
    switch(action.type){

        case RECEIVE_MSG:
            return {...action.data}

        case RECEIVE_ERR:
            return {...previousState,message:action.data}

        default:
        return previousState
        
   }
}


// 管理reduce
export default combineReducers({loginUserInfo,updateUserInfo}) 