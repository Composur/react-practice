import React ,{Component}from 'react'

import {Switch,Route,Redirect} from 'react-router-dom'
import Loadable from 'react-loadable';
import Cookies from 'js-cookie'
import Loading  from '../../components/loading'
import Boss from '../boss/'
import Personal from '../personal';
import {redirectTo} from '../../utils'


const BoosMain = Loadable({
    loader: () => import('../bossMain'),
    loading: Loading,
  });


export default class Main extends Component{

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
            const {payload={}}=this.props.loginUserInfo
            // const {payload={}}=this.props.updateUserInfo
            console.log(payload)
            if(!payload._id){ //已登录但又未登录
                const {payload}=this.props
                console.log(payload)
                console.log('已登录但又未登录')
                // console.log(this.props.userInfo())
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
                <Route path='/boss' component={BoosMain}></Route>
               </Switch>
            </div>
        )
    }
}