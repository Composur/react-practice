import React,{Component} from 'react'

import {NavBar,InputItem,TextareaItem,Button,WingBlank,List,WhiteSpace} from 'antd-mobile'

import Avatar from '../../components/avatar'
class Boss extends Component{
    constructor(){
        super()
        this.state={}
        this.backClick= this.backClick.bind(this)
    }
    backClick(){

    }
    render() {
       return(
        <div>
            <NavBar onLeftClick={this.backClick} mode="dark" leftContent="返回">智能CRM</NavBar>
            <Avatar></Avatar>
            <WingBlank>
                <WhiteSpace />
                <List>
                <WhiteSpace />
                    <InputItem clear  onChange={val=>{this.handleChange('username',val)}} placeholder='职位'></InputItem>
                    <InputItem clear  onChange={val=>{this.handleChange('password',val)}} placeholder='名称' ></InputItem>
                    <InputItem
                      placeholder="薪资 0.00"
                      extra="¥"
                    ></InputItem>
                </List>
                <WhiteSpace />
                <List>
                    <TextareaItem placeholder='要求' rows={5} count={100}/>
                </List>
                <Button type="primary" onClick={this.save}>保存</Button>
            </WingBlank>
        </div>   
       )
    }
}
export default Boss