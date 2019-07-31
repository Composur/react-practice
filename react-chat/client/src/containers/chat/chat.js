import React, { Component } from 'react';
import {connect} from 'react-redux'
import { NavBar, Icon,InputItem,Grid} from 'antd-mobile';
import {sendMsg} from '../../redux/actions' 
import './chat.less'
class Chat extends Component {
  constructor(){
    super()
    this.state={
      content:'',
      emojiShow:false,
      count:1
    }
    this.sendMsg=this.sendMsg.bind(this)
    this.emojiHandle=this.emojiHandle.bind(this)
    this.selectEmoji=this.selectEmoji.bind(this)
    this.onFocus=this.onFocus.bind(this)
    this.onkeyEnter=this.onkeyEnter.bind(this)
  }
  emojiData=[{icon:'',text:'😁'},{icon:'',text:'😁'},{icon:'',text:'😁'},{icon:'',text:'😁'},{icon:'',text:'😁'},{icon:'',text:'😁'}]
  backClick(){
    this.props.history.goBack(1)
  }
  handleChange(name,val){
    this.setState({
      [name]:val
    })
  }
  emojiHandle(){
    this.setState({
      emojiShow:!this.state.emojiShow
    })
  }
  sendMsg(){
    const {payload}=this.props.loginUserInfo
    const {userid}=this.props.match.params
    const {user={}}=this.props.msgsList
    const targetID=this.props.match.params.userid //目标ID
    if (this.state.content && payload._id && userid) {
      const params={
        from: payload._id,
        to: userid,
        content: this.state.content,
        read:false,
        avatar:user[targetID].avatar,
        username:user[targetID].username
      }
      this.setState({
        emojiShow:false
      })
      this.props.sendMsg(params)
      this.setState({
        content:''
      })
    }
  }
  onkeyEnter(e){
    console.log(e.keyCode)
    if(e.keyCode===13){
      this.sendMsg()
    }
  }
  selectEmoji(el,index){
    this.setState({
      content:this.state.content+el.text
    })
  }
  onFocus(){
    this.setState({
      count:this.state.count+1
    })
    console.log(this.state.count)
    // this.emojiHandle()
  }
  componentDidMount(){
    window.scrollTo(0,document.body.scrollHeight)
  }
  componentDidUpdate (){
    window.scrollTo(0,document.body.scrollHeight)
  }
  render() {
    const {payload={}}=this.props.loginUserInfo
    const {user={},chatMsgs=[]}=this.props.msgsList
    const currentUserID=payload._id //登录用户的ID
    const currentUserAvatar=require(`../../assets/images/${payload.avatar || '头像1'}.png`)
    const targetID=this.props.match.params.userid //目标ID
    let targetUserAvatar=require(`../../assets/images/头像1.png`)
    let username='消息'//默认的消息头
    if(user[targetID]){
      const targetAvatar=user[targetID].avatar
      username=user[targetID].username
      targetUserAvatar=require(`../../assets/images/${targetAvatar || '头像1'}.png`)
    }else{
      return null
    }
   
    const chatID=[currentUserID,targetID].sort().join('_')
    // 获取当前聊天记录
    const currentChatMsg=chatMsgs.filter(val=>val.chat_id===chatID)
    const itemStyle={
    }
    return (
        <div className='container'>
          <NavBar
                onLeftClick={this.backClick.bind(this)}
                mode="dark"
                leftContent={<Icon type={'left'}  />}
                rightContent={[
                    <Icon key="1" type="ellipsis" />,
                    ]}
            >{username}</NavBar>
          <div className='chat-body'>
          {
            currentChatMsg.map(val=>{
              const {chat_id,from,to,content,_id}=val
              if(currentUserID===to){ //别人对我说的
                return(
                  <div className='chat-wrap' key={_id}>
                    <div className='avatar'><img src={targetUserAvatar} alt='avatar'></img></div>          
                    <div className='message'>{content}</div>
                  </div>
                )
              }else{ //我对别人说的
                return(
                  <div className='chat-wrap-right' key={_id}>
                    <div className='message'>{content}</div>
                    <div className='avatar'><img src={currentUserAvatar} alt='avatar'></img></div>          
                  </div>
                )
              }
            })
          }
          </div>
         
          <div className='chat-footer'>
            <InputItem value={this.state.content} onKeyDown={this.onkeyEnter}
            onChange={(val)=>this.handleChange('content',val)}
            onFocus={this.onFocus}
            extra={ <div><span onClick={this.emojiHandle}>😁</span><span onClick={this.sendMsg} >发送</span></div> }>
            </InputItem>
            {
              this.state.emojiShow?<Grid data={this.emojiData} onClick={this.selectEmoji} columnNum='10' itemStyle={itemStyle} hasLine={false} /> :null
            }
          </div>
        </div>
    );
  }
}
export default connect((state)=>({
  loginUserInfo:state.loginUserInfo,
  msgsList:state.msgsList
}),{sendMsg})(Chat) ;