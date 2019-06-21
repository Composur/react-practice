import React ,{Component}from 'react'

import {Switch,Route,Redirect} from 'react-router-dom'
import Loadable from 'react-loadable';
import Cookies from 'js-cookie'

import Boss from '../boss/'
import Personal from '../personal';

// import BossMain from '../bossMain'; 
import PersonMain from '../personMain';

import Message from '../message' 
import User from '../userSetting'; 


import notFound from '../../components/error'
import Loading  from '../../components/loading'

import {redirectTo} from '../../utils'
import { NavBar } from 'antd-mobile';



const BoosMain = Loadable({ //按需加载
    loader: () => import('../bossMain'),
    loading: Loading
  });


export default class Main extends Component{
    // 加上static是给对象内添加属性，不加是给组件对象添加属性
    navList=[ //导航tab
        {path:'/boss',title:'admin',icon:'laobao',component:PersonMain},
        {path:'/personal',title:'personal',icon:'dashen',component:BoosMain},
        {path:'/message',title:'消息',icon:'message',component:Message},
        {path:'/user',title:'个人中心',icon:'personal',component:User},
    ]
    // 有cookie但是redux中没有登录信息，需要请求一下当前cookie的用户信息
    componentDidMount(){
        const userId=Cookies.get('user_id')
        const {payload={}}=this.props.loginUserInfo
        if (userId && !payload._id) {
            console.log('getUserInfo')
            this.props.userInfo()
        }
    }

  
    render(){
        // 检查用户是否登录
        const userId=Cookies.get('user_id')

        if(!userId){ //未登录

            return <Redirect to='/login'></Redirect>

        }else{ //已登录，获取redux中的数据

            console.log(this.props)

            let payload = {}

            if (this.props.loginUserInfo.payload) {
                payload = this.props.loginUserInfo.payload
            } else if (this.props.updateUserInfo.payload) {
                payload = this.props.updateUserInfo.payload
            }
           
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
        // 子路由导航
        const {navList}=this
        const path=this.props.location.pathname
        const nav=navList.find(val=>val.path===path)
        return(
            <div>
                {nav?<NavBar>{nav.title}</NavBar>:null}
               <Switch> {/* 等于说是main路由下的路由 */}
                <Route path='/bossInfo' component={Boss}></Route>
                <Route path='/personInfo' component={Personal}></Route>
                <Route path={`/${nav.path}`} component={nav.component}></Route>
                <Route path='/notFound' component={notFound}></Route>
               </Switch>
            </div>
        )
    }
}