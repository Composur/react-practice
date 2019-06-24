import React, { Component } from 'react';
import { Result, List, WhiteSpace,Button } from 'antd-mobile';
import './user.less'
import { getCookie,clearCookie } from '../../utils';
const {Item}=List
const {Brief}=Item
export default class User extends Component {
    state = {  }
    singOut=()=>{
        console.log(getCookie('user_id'))
        clearCookie('user_id')
        console.log(this.props)
     
    }
    render() {
        const {payload={}}=this.props.updateUserInfo || this.props.loginUserInfo
        console.log(payload)
        // const icon=require(`../../assets/images/${payload.avatar}.png`)
        return (
            <div>
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