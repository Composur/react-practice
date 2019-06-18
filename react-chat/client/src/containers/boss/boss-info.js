import React,{Component} from 'react'

import {NavBar,InputItem,TextareaItem,Button,WingBlank,List,WhiteSpace} from 'antd-mobile'

import Avatar from '../../components/avatar'
class Boss extends Component{
    constructor(){
        super()
        this.state={
            avatar:''
        }
        this.backClick= this.backClick.bind(this)
        this.save=this.save.bind(this)
        this.setAvatar=this.setAvatar.bind(this)
    }
    backClick(){
        alert('back')
    }
    setAvatar(name=''){
        this.setState({
            avatar:name
        })
    }
    handleChange(name,val){
        this.setState({
            [name]:val
        })
    }
    save(){
       this.props.boss(this.state) //把数据传递给action
    }
    render() {
        console.log(this.props.bossInfo) //得到reducer的数据
       return(
        <div>
            <NavBar onLeftClick={this.backClick} mode="dark" leftContent="返回">智能CRM</NavBar>
            <Avatar setAvatar={this.setAvatar}></Avatar>
            <WingBlank>
                <WhiteSpace />
                <List>
                <WhiteSpace />
                    <InputItem clear  onChange={val=>{this.handleChange('post',val)}} placeholder='招聘职位'></InputItem>
                    <InputItem clear  onChange={val=>{this.handleChange('company',val)}} placeholder='公司名称' ></InputItem>
                    <InputItem
                      placeholder="薪资 0.00" onChange={val=>{this.handleChange('salary',val)}}
                      extra="¥"
                    ></InputItem>
                </List>
                <WhiteSpace />
                <List>
                    <TextareaItem placeholder='要求' onChange={val=>{this.handleChange('info',val)}} rows={5} count={100}/>
                </List>
                <Button type="primary" onClick={this.save}>保存</Button>
            </WingBlank>
        </div>   
       )
    }
}
export default Boss