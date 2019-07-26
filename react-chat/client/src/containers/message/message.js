import React,{Component} from 'react'
import {List} from 'antd-mobile'


const Item=List.Item
const {Brief,Badge}=Item

function getMsgLists(chatMsgs,user){
  /**
   * 获取消息列表，与未读的消息数量
   */
  const lastMsgsObjs = {}
  chatMsgs.forEach(element => {
    // 获取未读消息数量
    if (user._id === element.to && !element.read) { //先看看是发的消息还是收到的消息是否已读
      element.unReadCount=0
    }else{
      element.unReadCount=1
    }
   

    //1. 得到每句聊天的chat_id
    const {chat_id}=element
    const lastMsgs=lastMsgsObjs[chat_id]
    if(!lastMsgs){ //当前的msg就是所在组的lastMsg
      lastMsgsObjs[chat_id]=element
    }else{
      // 2.如果msg比lastMsg晚，进行替换(聊天后又进行了聊天，更新了最后一条消息))
      if(element.create_time>lastMsgs.create_time){
        lastMsgsObjs[chat_id]=element
      }
    }
  });
  return lastMsgsObjs
}


export default class message extends Component {

  render() {
    const messageStyle={
      marginTop:'50px',
      marginBottom:'50px'
    }

    const {payload}=this.props.loginUserInfo
    const {user={},chatMsgs=[]}=this.props.msgsList

    // 1.得到最后一条聊天记录
    const lastMsgs=getMsgLists(chatMsgs,user)
    // 2.得到最后一条聊天记录组成的数组
    const lastMsgsArr=Object.values(lastMsgs)
    // 3.对数组进行排序
    lastMsgsArr.sort((a,b)=>{
     return b.create_time-a.create_time
    })

    return (
      <div style={messageStyle}>
      {
        lastMsgsArr.map(item=>{
          const currentId=payload._id
          const currentChatId=item.to===currentId?item.from:item.to
          const targetUser=item.to===currentId?user[item.from]:user[item.to]
          return(
            <List className="my-list" key={item._id} onClick={()=>this.props.history.push(`/chat/${currentChatId}`)}>
              <Item  align="top" multipleLine
              thumb={targetUser.avatar?require(`../../assets/images/${targetUser.avatar}.png`):null}
              ><Brief>{targetUser.username || ''}</Brief>{item.content}</Item>
            </List>
          )
        })
      }
      </div>
    );
  }
}