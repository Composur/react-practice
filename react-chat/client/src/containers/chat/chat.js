import React, { Component } from 'react';
import {connect} from 'react-redux'
import { NavBar, Icon,InputItem} from 'antd-mobile';
import {getMsgList} from '../../redux/actions' 
import './chat.less'
class Chat extends Component {
  constructor(){
    super()
    this.state={
      content:''
    }
    this.sendMsg=this.sendMsg.bind(this)
  }

  backClick(){
    this.props.history.goBack(1)
  }
  handleChange(name,val){
    this.setState({
      [name]:val
    })
  }
  sendMsg(){
    const {payload}=this.props.loginUserInfo
    const {userid}=this.props.match.params
    if (this.state.content && payload._id && userid) {
      const params={
        from: payload._id,
        to: userid,
        content: this.state.content
      }
      this.props.getMsgList(params)
      this.setState({
        content:''
      })
    }
  }
  render() {
    return (
        <div className='container'>
            
          <NavBar
                onLeftClick={this.backClick.bind(this)}
                mode="dark"
                leftContent={<Icon type={'left'}  />}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                    ]}
            >消息</NavBar>
        
          <div className='chat-wrap'>
            <div className='avatar'><img src={require(`../../assets/images/头像1.png`)} alt='avatar'></img></div>          
            <div className='message'>你好我是xxx</div>
          </div>

          <div className='chat-wrap-right'>
            <div className='message'>你好我是xxx</div>
            <div className='avatar'><img src={require(`../../assets/images/头像1.png`)} alt='avatar'></img></div>          
          </div>

          <div className='chat-footer'>
            <InputItem className='input-text' value={this.state.content}
              onChange={(val)=>this.handleChange('content',val)}
              extra={ <span className='send-btn' onClick={this.sendMsg}>发送</span> }>
              </InputItem>
          </div>
        </div>
    );
  }
}
export default connect((state)=>({
  loginUserInfo:state.loginUserInfo
}),{getMsgList})(Chat) ;