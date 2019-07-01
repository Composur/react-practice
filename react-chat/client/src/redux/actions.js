/**
 * 包含多个action types
 * 同步actions
 * 异步actions
 */
import io from 'socket.io-client'
import {socketUrl} from '../config/config.default'
import {reqRegister,reqLogin,reqUpdateUser,reqUserInfo,reqUserList,reqMsgList} from '../api'
import{AUTH_SUCCESS,ERROR_MSG,RECEIVE_MSG,RECEIVE_ERR,GET_USER_LIST,GET_MSG_LIST,GET_MSG} from './action-types'
let socket=null


/**
 * 同步的action分发
*/

// 验证成功
const auth_success=(data)=>({type:AUTH_SUCCESS,data:data})
        
// 验证失败返回message
const auth_false=(message)=>({type:ERROR_MSG,data:{message}})

// 更新成功
const update_success=data=>({type:RECEIVE_MSG,data:data})

// 更新失败
export const update_err=message=>({type:RECEIVE_ERR,data:message})

// 得到用户列表
const get_user_list=(userList)=>({type:GET_USER_LIST,data:userList})

// 得到消息列表
const get_msg_list=({user,chatMsgs})=>({type:GET_MSG_LIST,data:{user,chatMsgs}})

// 得到消息
const get_msg=(msgs)=>({type:GET_MSG,data:msgs})


/*
  actions
*/

//  注册
export const register = (data) => {
    // 拿到UI层的注册数据
    const {username,password,passwordAgain}=data

    if (!username) {
        return auth_false('用户名不能为空')
    } else if (!password) {
        return auth_false('密码不能为空')
    } else if (password !== passwordAgain) {
        return auth_false('两次密码输入不一致')
    }

    // 异步action返回成功或者失败的信息
    return async dispatch => {

        // 发送注册的异步请求
        const res = await reqRegister(data) //拿到数据
        const result=res.data
        //  拿到数据后无论成功或失败要去分发同步的action
        if (result.success) {
           dispatch(auth_success(result))
           const {_id}=result.payload
           getUserMsgsList(dispatch,_id)
        }else{
           dispatch(auth_false(result))
        }   
    }
}

//  登录
export const login = (data) => {
    const {username,password,type}=data
    if (!username) {
        return auth_false('用户名不能为空')
    } else if (!password) {
        return auth_false('密码不能为空')
    } else if(!type){
        return auth_false('类型不能为空')
    }

    return async dispatch => {

        // 发送注册的异步请求
        const res = await reqLogin(data) //拿到数据
        const result=res.data

        //  拿到数据后无论成功或失败要去分发同步的action
        if(result.success){
           dispatch(auth_success(result))
           console.log(result)
           const {_id}=result.payload
           getUserMsgsList(dispatch,_id)
        }else{
           dispatch(auth_false(result.message))
        }
    }
}

// 用户信息更新
export const userUpdate=(data)=>{
    const {avatar}=data
    if(!avatar){
        return update_err('头像不能为空')
    }
    return async dispatch=>{
        const res=await reqUpdateUser(data)
        const result=res.data
        if(result.success){
            dispatch(update_success(result))
        }else{
            dispatch(update_err(result || '更新失败！'))
        }
    }
}

// 获取用户信息
export const userInfo=()=>{

  return async dispatch=>{

    const {data}=await reqUserInfo()
    if (data.success) {
        const {_id}=data.payload
        getUserMsgsList(dispatch,_id)
        dispatch(auth_success(data))
      } else {
          dispatch(auth_false(data || '更新失败！'))
    }

  }
}

// 获取用户列表
export const userList=(type)=>{
    return async dispatch=>{
        const {data} = await reqUserList(type)
        if(data.success){
          dispatch(get_user_list(data))
        }
    }
}


// 获取消息列表
export const getMsgList=(parms)=>{
  if(parms){
    return  dispatch=>{
      console.log('浏览器发送',parms)
      getUserMsgsList(dispatch,parms)
    }
  }
}

// 发送消息
export const sendMsg = (content) => {
  return dispatch => {
    console.log('浏览器发出', content)
    // 发消息
    socket.emit('sendMsg',content)
  }
}
 
// 初始化socket连接
function initIO(dispatch,userid){
  console.log(userid)
  if(!socket){
    socket=io(socketUrl)
    socket.on('sendClientMsg',function(data){ //浏览器监听接收服务器发来的消息，前后端消息名称要一致
      if (data.from === userid || data.to === userid) { //只有当前消息是自己的消息在进行分发
        dispatch(get_msg(data)) //分发单条信息，聊天界面用
        console.log('浏览器收到', data)
      }
    })
  }
}

// 在登录、注册、获取用户列表阶段、获取用户消息列表
async function getUserMsgsList(dispatch,userid) { 
    initIO(dispatch,userid)
    const {data} = await reqMsgList()
    if(data.success){
      const {user,chatMsgs}=data.payload
      dispatch(get_msg_list({user,chatMsgs})) //分发所有的消息，消息列表用
    }
 }
