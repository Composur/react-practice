import React ,{Component} from 'react'

import {List,Grid} from 'antd-mobile'

import PropTypes from 'prop-types';

class Avatar extends Component{

    static propTypes={
        setAvatar:PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        this.state={
            icon:null
        }
        this.imgData=[]
        for(let i=0;i<20;i++){
            this.imgData.push({
                icon:require(`../../assets/images/头像${i+1}.png`),
                text:`头像${i+1}`
            })
        }
        this.clickHandle=this.clickHandle.bind(this)
    }
    clickHandle({icon,text}){
        this.setState({icon})
        this.props.setAvatar(text)
    }
    render(){
        const {icon}=this.state
        const hasAvatar=(<div>已选择头像：<img src={icon}/></div>)
        const  AvatarMsg=icon?hasAvatar:'请选择头像'
        return(
           <List renderHeader={()=>AvatarMsg}>
           <Grid data={this.imgData} onClick={this.clickHandle} columnNum={5}></Grid>
           </List>
        )
    }
}

export default Avatar