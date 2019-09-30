import React, { Component } from 'react'
import { NavBar, Icon, WingBlank, WhiteSpace, List, InputItem,Radio,Button,Toast} from 'antd-mobile';

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
// 异步的action
import {register} from '../../redux/actions'

import Logo from '../../components/logo'
import './register.less'
const ListItem=List.Item

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            passwordAgain:'',
            type:'',
            message:''
        }
        this.registerHandle=this.registerHandle.bind(this)
        this.toLogin=this.toLogin.bind(this)
    }
    handleChange(name,val) {
        this.setState({
            [name]:val
        })
    }
    registerHandle(){
        this.props.register(this.state)
    }
    toLogin(){
        this.props.history.replace('/login')
    }
    backClick() {
        alert('back')
    }
    render() {
        const {type}=this.state
        const {redirectTo}=this.props.regUserInfo
        if(redirectTo){
          return   <Redirect to={redirectTo}/>
        }
        return (
            <div className='border'>
                <NavBar
                    onLeftClick={this.backClick.bind(this)}
                    mode="dark"
                    leftContent="返回"
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >Boss直聘</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <WhiteSpace />
                    <List>
                    <WhiteSpace />
                        <InputItem clear  onChange={val=>{this.handleChange('username',val)}} placeholder='请输入用户名'></InputItem>
                        <InputItem clear  type='password' onChange={val=>{this.handleChange('password',val)}} placeholder='请输入密码' ></InputItem>
                        <InputItem clear  type='password' onChange={val=>{this.handleChange('passwordAgain',val)}} placeholder='请再次输入密码'></InputItem>
                    </List>
                    <ListItem>
                        <span>类型：</span>
                        <Radio checked={type==='admin'?true:false} className="my-radio" onChange={e => this.handleChange('type','admin')}>类型一</Radio>
                        <Radio checked={type==='normal'?true:false} className="my-radio" onChange={e => this.handleChange('type','normal')}>类型二</Radio>
                    </ListItem>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.registerHandle}>注册</Button>
                    <WhiteSpace />
                    <Button onClick={this.toLogin}>已有账户</Button>
                </WingBlank>
            </div>
        )
    }
}
// 只是一个UI组件
// export default Register

// 包装生成一个容器组件 

export default connect(state =>({
    // loginUserInfo:state.loginUserInfo
    regUserInfo:state.regUserInfo
}),

{register} //action

)(Register)