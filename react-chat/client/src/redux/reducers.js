/**
 * 根据老的state和和传入的actions生成新的state，一般会有多个reducer
 * 
 */

import {combineReducers} from 'redux'
import{REG_FAIL,REG_SUCCESS,AUTH_SUCCESS,ERROR_MSG,RECEIVE_MSG, RECEIVE_ERR,GET_USER_LIST,GET_MSG_LIST,GET_MSG,UPDATE_READ_MSG} from './action-types'

import {redirectTo} from '../utils'

const initUser = {
    username: '', // 用户名
    type: '', // 用户类型 dashen/laoban
    message: '', // 错误提示信息
    redirectTo: '' // 需要自动重定向的路由路径
  }
// 用户信息
export function loginUserInfo(previousState = initUser, action) { //管理user type=boss message err
   switch(action.type){

        case AUTH_SUCCESS:
            const {type=undefined,avatar=undefined}=action.data.payload
            return {...action.data,redirectTo:redirectTo(type,avatar)}

        case ERROR_MSG:
            return {...action.data}

        case RECEIVE_MSG:
            return {...action.data}

        case RECEIVE_ERR:
            return {...previousState,...action.data}
        default:
        return previousState
        
   }
    
}

// 用户列表
export function userListInfo(previousState={},action){
    switch(action.type){
        case GET_USER_LIST:
        return action.data
        default:
        return previousState
    }
}

// 用户的更新信息
// export function updateUserInfo(previousState={},action){
//     switch(action.type){
//         default:
//         return previousState
//    }
// }

// 用户消息列表

const userMsgList={
    user:{},//用户消息列表
    chatMsgs:[],//聊天记录
    unReadCount:0 //未读消息数量
}

export function msgsList(previousState=userMsgList,action){
    switch(action.type){
        case GET_MSG_LIST:
        return {...previousState,...action.data}
        case GET_MSG: 
        return {
            user:previousState.user,
            chatMsgs:[...previousState.chatMsgs,action.data], //当前的聊天记录
            unReadCount:0
        }
        default:
        return previousState
    }
}

export function updateReadMsg(previousState={},action){
    if(action.type===UPDATE_READ_MSG){
        return {...action.data}
    }else{
        return previousState
    }
}

// 注册用户
export function regUserInfo(previousState=initUser,action){
    if(action.type===REG_SUCCESS){
        const {type=undefined,avatar=undefined}=action.data.payload
        return {...action.data,redirectTo:redirectTo(type,avatar)}
    }else if(action.type===REG_FAIL){
        return {...action.data}
    }else{
        return previousState
    }
}

// 管理reduce
export default combineReducers({regUserInfo,loginUserInfo,userListInfo,msgsList,updateReadMsg}) 