import React ,{Component}from 'react'
import {NavBar,WingBlank,InputItem,WhiteSpace,Button,List,TextareaItem} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import Avatar from '../../components/avatar';



class Personal extends Component{
    constructor(){
        super()
        this.state={

        }
        this.setAvatar=this.setAvatar.bind(this)
        this.save=this.save.bind(this)
    }
    handleChange(name,val){
        this.setState({
            [name]:val
        })
    }
    setAvatar(name){
       this.setState({
           avatar:name
       })
    }
    save(){
        console.log(this.state)
        this.props.userUpdate(this.state)
    }
    render(){
        const result=this.props.updateUserInfo  //得到reducer的数据
        if(result&&result.success){ 
            const {avatar,type}=result.payload
            if(avatar){//判断信息是否完善
                const path=type==='admin'?'/boss':'/normal'
               return <Redirect to={path}/>
            }
        }
        return(
            <div>
            <NavBar onLeftClick={this.backClick} mode="dark" leftContent="返回">智能CRM</NavBar>
                <Avatar setAvatar={this.setAvatar}></Avatar>
                <WingBlank>
                <WhiteSpace />
                <List>
                <WhiteSpace />
                    <InputItem clear  onChange={val=>{this.handleChange('position',val)}} placeholder='求职职位'></InputItem>
                </List>
                <WhiteSpace />
                <List>
                    <TextareaItem placeholder='个人介绍' name='personInfo' rows={5} count={100}/>
                </List>
                <Button type="primary" onClick={this.save}>保存</Button>
            </WingBlank>
            </div>
        )
    }
}

export default Personal