import React ,{Component} from 'react'

import {List,Grid} from 'antd-mobile'



const AvatarMsg='请选择头像'
class Avatar extends Component{
    constructor(){
        super()
        this.imgData=[]
        for(let i;i<20;i++){
            this.imgData.push({
                icon:require(`../../assets/images/头像${i+1}.png`),
                text:`头像${i+1}`
            })
        }
    }
    render(){
        return(
           <List renderHeader={()=>AvatarMsg}>
           <Grid data={this.imgData}></Grid>
           </List>
        )
    }
}

export default Avatar