/**
 * 包含多个action types
 * 同步actions
 * 异步actions
 */

import {reqRegister,reqLogin,reqUpdateUser} from '../api'
import{AUTH_SUCCESS,ERROR_MSG,RECEIVE_MSG,RECEIVE_ERR} from './action-types'

// 验证成功
const auth_success=(data)=>({type:AUTH_SUCCESS,data:data})
        
// 验证失败返回message
const auth_false=(message)=>({type:ERROR_MSG,data:message})

// 更新成功
const update_success=data=>({type:RECEIVE_MSG,data:data})

// 更新失败
const update_err=message=>({type:RECEIVE_ERR,data:message})

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
        }else{
           dispatch(auth_false(result.message))
        }   
    }
}

//  登录
export const login = (data) => {

    const {username,password}=data

    if (!username) {
        return auth_false('用户名不能为空')
    } else if (!password) {
        return auth_false('密码不能为空')
    } 

    return async dispatch => {

        // 发送注册的异步请求
        const res = await reqLogin(data) //拿到数据
        const result=res.data

        //  拿到数据后无论成功或失败要去分发同步的action
        if(result.success){
           dispatch(auth_success(result))
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
            dispatch(update_err(result.message || '更新失败！'))
        }
    }
}

 