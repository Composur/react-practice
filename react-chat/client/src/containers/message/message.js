import React,{Component} from 'react'
import {List,Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux'

const Item=List.Item
const {Brief}=Item

function getMsgLists(chatMsgs, userId) {
  /**
   * 获取消息列表，与未读的消息数量
   */
  const lastMsgsObjs = {}

  chatMsgs.forEach(element => {

    // 获取未读消息数量
    if (userId === element.to && !element.read) { //先看看是发的消息还是收到的消息是否已读
      element.unReadCount = 1
    } else {
      element.unReadCount = 0
    }

    //1. 得到每句聊天的chat_id
    const {
      chat_id
    } = element

    //2.和所有人聊天的最后一句对象
    const lastMsgs = lastMsgsObjs[chat_id]

    if (!lastMsgs) { //如果没有聊天记录就保存；当前的msg就是所在组的lastMsg
      lastMsgsObjs[chat_id] = element
    } else {
      // 统计未读消息数量最后一条+当前
      const unReadCount=lastMsgs.unReadCount+ element.unReadCount
      // 2.如果msg比lastMsg晚，进行替换(聊天后又进行了聊天，更新了最后一条消息))
      if (element.create_time > lastMsgs.create_time) {
        lastMsgsObjs[chat_id] = element
      }
      lastMsgsObjs[chat_id].unReadCount=unReadCount
    }
  });
  const lastMsgsArr = Object.values(lastMsgsObjs) //返回一个对象可枚举属性值的数组
  // 3.对数组进行降序；让最新的消息排到前面
  lastMsgsArr.sort((a, b) => {
    return b.create_time - a.create_time
  })
  return lastMsgsArr
}

/**
 * @description 消息分组，按用户ID分组
 */ 

  class message extends Component {

  render() {
    const messageStyle={
      marginTop:'50px',
      marginBottom:'50px'
    }

    const {payload={}}=this.props.loginUserInfo 
    const {user={},chatMsgs=[]}=this.props.msgsList
    // 消息列表
    const lastMsgsArr=getMsgLists(chatMsgs,payload._id)
    if(!lastMsgsArr){
      return null
    }
    return (
      <div style={messageStyle}>
      <List className="my-list">
      <QueueAnim type='alpha'>
        {
          lastMsgsArr.map(item=>{
            const currentId=payload._id
            const currentChatId=item.to===currentId?item.from:item.to //可能是自己也可能是对方
            const targetUser=item.to===currentId?user[item.from]:user[item.to] //可能是自己也可能是对方
            return(
              <Item align="top"  extra={<Badge text={item.unReadCount}/>} multipleLine  key={item._id} onClick={()=>this.props.history.push(`/chat/${currentChatId}`)}
                thumb={targetUser.avatar?require(`../../assets/images/${targetUser.avatar}.png`):null}
              ><Brief>{targetUser.username || ''}</Brief>{item.content}</Item>
            )
          })
        }
        </QueueAnim>
      </List>
     
      </div>
    );
  }
}



const mapStateToProps=(state)=>({
  msgsList:state.msgsList,
  loginUserInfo:state.loginUserInfo
})

const mapDispatchToProps=()=>{

}


export default connect(mapStateToProps,null)(message)