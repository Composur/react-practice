import React ,{Component}from 'react'

import {Switch,Route,Redirect} from 'react-router-dom'
import Loadable from 'react-loadable';

// 用户信息界面
import Boss from '../boss/'
import Personal from '../personal';

// main界面
// import BossMain from '../bossMain'; 
import PersonMain from '../personMain';
import Message from '../message' 
import User from '../userSetting'; 

// 聊天界面
import Chat from '../chat'

import notFound from '../../components/error'
import Loading  from '../../components/loading'

import {redirectTo,getCookie} from '../../utils'
import { NavBar } from 'antd-mobile';
import NavFooter from '../../components/nav-footer';
import './main.css'

const BoosMain = Loadable({ //按需加载
    loader: () => import('../bossMain'),
    loading: Loading
  });
 

export default class Main extends Component{
    // 加上static是给对象内添加属性，不加是给组件对象添加属性
    navList=[ //导航tab
        {path:'/boss',title:'admin',icon:'laoban',component:PersonMain},
        {path:'/personal',title:'personal',icon:'dashen',component:BoosMain},
        {path:'/message',title:'消息',icon:'message',component:Message,'isMessage':true},
        {path:'/user',title:'个人中心',icon:'personal',component:User},
    ]
    // 有cookie但是redux中没有登录信息，需要请求一下当前cookie的用户信息
    componentDidMount(){
        const userId=getCookie('user_id')
        const {payload={}}=this.props.loginUserInfo
        if (userId && !payload._id) {
            this.props.userInfo()
        }
    }
    render(){
        // 检查用户是否登录
        const userId=getCookie('user_id')
        const { payload={} } = this.props.loginUserInfo || this.props.updateUserInfo
        const {chatMsgs=[]}=this.props.msgLists
        let unReadCount=chatMsgs.reduce((pre,item)=>{
            return pre+(!item.read&&item.to===payload._id?1:0)
        },0)
        if(!userId){ //未登录去登录
            return <Redirect to='/login'/>
        }else{ 
            if(payload._id){ //已登录，获取redux中的数据
                let path=this.props.location.pathname
                if(path==='/'){
                    const {type,avatar}=payload
                    path=redirectTo(type,avatar)
                    return <Redirect to={path}/>
                }
            }
        }

        // 子路由导航
        const {navList}=this
        const currentPath=this.props.location.pathname

        const currentNav = navList.find(val => {
            return val.path === currentPath
        })

        if (currentNav) { //切换要显示的footer项
            if (payload.type === 'admin') {
                navList[1].hide = true
            } else {
                navList[0].hide = true
            }
        }
        
        return(
            <div>
                {currentNav?<NavBar>{currentNav.title}</NavBar>:null}
               <Switch> {/* 等于说是main路由下的路由 */}
                <Route path='/bossInfo' component={Boss}></Route>
                <Route path='/personInfo' component={Personal}></Route>
                <Route path='/notFound' component={notFound}></Route>
                <Route path='/chat/:userid' component={Chat}></Route>
                {
                    navList.map((item,index)=>{
                     return   <Route path={item.path} component={item.component} key={index}></Route>
                    })
                }
               </Switch>
               {currentNav?<NavFooter navList={this.navList} unReadCount={unReadCount}></NavFooter>:null}
            </div>
        )
    }
}