import React, { Component } from 'react';
import { Result, List, WhiteSpace,Button,Modal } from 'antd-mobile';
import './user.less'
import {clearCookie } from '../../utils';
const {Item}=List
const {Brief}=Item
const {alert}=Modal
export default class User extends Component {
    state = {  }
    constructor(){
        super()
        this.singOut=this.singOut.bind(this)
    }
    singOut(){
        alert('退出', '确定退出吗？', [
            { text: '取消'},
            { text: '确定', onPress: () => {
                clearCookie('user_id')
                this.props.userInfo() //更新redux
            } },
          ])
       
    }
    render() {
        const settingStyle={
            marginTop:'50px',
            marginBottom:'50px'
        }
        const {payload={}}=this.props.loginUserInfo
        console.log(payload)
        return (
            <div style={settingStyle}>
                <Result
                img={<img src={require(`../../assets/images/${payload.avatar || '头像1'}.png`)} alt='头像'/>}
                title={payload.username}
                message={<div>{payload.position}</div>}
                />
                <WhiteSpace />
                <List  renderHeader={() => '基本信息'} className="my-list">
                    <Item multipleLine>
                      <Brief>职位：{payload.position}</Brief>
                      <Brief>简介：{payload.info}</Brief>
                      <Brief>薪资：{payload.salary}</Brief>
                    </Item>
                </List>
                <WhiteSpace />
                <Button type='warning' onClick={this.singOut}>退出登录</Button>
            </div>
        );
    }
}