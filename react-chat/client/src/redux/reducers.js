/**
 * 根据老的state和和传入的actions生成新的state，一般会有多个reducer
 * 
 */

import {combineReducers} from 'redux'
import{AUTH_SUCCESS,ERROR_MSG,RECEIVE_MSG, RECEIVE_ERR,GET_USER_ERROR,GET_USER_SUCCESS} from './action-types'

import {redirectTo} from '../utils'


// 用户的登录信息
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

// 用户的更新信息
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


// 用户信息

export function userInfo(previousState={},action){
    switch(action.type){
        case GET_USER_SUCCESS:
        return {...action.data}
        case GET_USER_ERROR:
        return {...action.data}
        default:
        return previousState
    }
}

// 管理reduce
export default combineReducers({loginUserInfo,updateUserInfo,userInfo}) 