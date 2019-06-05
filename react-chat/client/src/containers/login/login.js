import React, { Component } from 'react'
import { NavBar, Icon, WingBlank, WhiteSpace, List, InputItem,Radio,Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo'

import './login.less'

const ListItem=List.Item
class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            type:''
        }
        this.loginHandle=this.loginHandle.bind(this)
        this.toRegister=this.toRegister.bind(this)
    }
    handleChange(name,val) {
        this.setState({
            [name]:val
        })
    }
    loginHandle(){
        this.props.login(this.state)
    }
    toRegister(){
        this.props.history.replace('/register')
    }
    backClick() {
        alert('back')
    }
    render() {
        const {type}=this.state
        const {message,redirectTo}=this.props.loginUserInfo
        if(redirectTo){
            return <Redirect to={redirectTo}/>
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
                >智能CRM</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <WhiteSpace />
                    <List>
                    <WhiteSpace />
                        <span className='error-msg'>{message?message:null}</span>
                        <InputItem clear  onChange={val=>{this.handleChange('username',val)}} placeholder='请输入用户名'></InputItem>
                        <InputItem clear  type='password' onChange={val=>{this.handleChange('password',val)}} placeholder='请输入密码' ></InputItem>
                    </List>
                    <ListItem>
                        <span>类型：</span>
                        <Radio checked={type==='admin'?true:false} className="my-radio" onChange={e => this.handleChange('type','admin')}>类型一</Radio>
                        <Radio checked={type==='normal'?true:false} className="my-radio" onChange={e => this.handleChange('type','normal')}>类型二</Radio>
                    </ListItem>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.loginHandle}>登陆</Button>
                    <WhiteSpace />
                    <Button onClick={this.toRegister}>注册</Button>
                </WingBlank>

            </div>
        )
    }
}

//  这个一般会单独写一个container.js 
// export default connect(state=>({}),{login})(Login)
export default Login