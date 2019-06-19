import React ,{Component}from 'react'

import {Switch,Route,Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import Boss from '../boss/'
import Personal from '../personal';
import {redirectTo} from '../../utils'

export default class Main extends Component{

    // 有cookie但是redux中没有登录信息，需要请求一下当前cookie的用户信息
    componentDidMount(){

        // const userId=Cookies.get('user_id')
        // const {_id=null}=this.props.loginUserInfo.payload //redux
        
        // if(userId&&!_id){
            
        // }
    }


    render(){
        // 检查用户是否登录
        const userId=Cookies.get('user_id')
        if(!userId){ //未登录
            return <Redirect to='/login'></Redirect>
        }else{ //已登录，获取redux中的数据
            const {payload={}}=this.props.loginUserInfo
            console.log(payload)
            if(!payload._id){ //已登录但又未登录
                console.log('已登录但又未登录')
                return null
            }else{
                let path=this.props.location.pathname
                if(path==='/'){
                    const {type,avatar}=payload
                    path=redirectTo(type,avatar)
                    console.log(path)
                    return <Redirect to={path}/>
                }
            }
           
        }

        return(
            <div>
               <Switch> {/* 等于说是main路由下的路由 */}
                <Route path='/bossInfo' component={Boss}></Route>
                <Route path='/personInfo' component={Personal}></Route>
               </Switch>
            </div>
        )
    }
}