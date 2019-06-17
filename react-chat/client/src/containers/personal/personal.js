import React ,{Component}from 'react'
import {NavBar,WingBlank,InputItem,WhiteSpace,Button,List,TextareaItem} from 'antd-mobile'
import Avatar from '../../components/avatar';



class Personal extends Component{
    constructor(){
        super()
        this.state={

        }
    }
    handleChange(name,val){
        this.setState({
            [name]:val
        })
    }
    render(){
        return(
            <div>
            <NavBar onLeftClick={this.backClick} mode="dark" leftContent="返回">智能CRM</NavBar>
                <Avatar></Avatar>
                <WingBlank>
                <WhiteSpace />
                <List>
                <WhiteSpace />
                    <InputItem clear  onChange={val=>{this.handleChange('username',val)}} placeholder='求职职位'></InputItem>
                </List>
                <WhiteSpace />
                <List>
                    <TextareaItem placeholder='个人介绍' rows={5} count={100}/>
                </List>
                <Button type="primary" onClick={this.save}>保存</Button>
            </WingBlank>
            </div>
        )
    }
}

export default Personal