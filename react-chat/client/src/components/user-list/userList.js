import React, { Component } from 'react';
import {WingBlank,WhiteSpace,Card} from 'antd-mobile'
import PropTypes from 'prop-types';
import './userList.css'

export default class UserList extends Component {
    state = {  }
    static propTypes={
        userListInfo:PropTypes.array.isRequired
    }
    render() {
        const {userListInfo}=this.props
        return (
          <div className='user-list'>
          {
            userListInfo.map((val,index)=>{
              return(
                <WingBlank size="lg" key={val._id}>
                <WhiteSpace size="lg" />
                <Card onClick={()=>this.props.history.push(`/chat/${val._id}`)}>
                  <Card.Header
                    title={val.username}
                    thumb={require(`../../assets/images/${val.avatar || '头像2'}.png`)}
                    extra={<span>{val.type}</span>}
                  />
                  <Card.Body>
                    <div>{val.company}</div>
                    <div>{val.post}</div>
                    <div>{val.salary}</div>
                  </Card.Body>
                  <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                </Card>
                <WhiteSpace size="lg" />
              </WingBlank>
              )
            })
          }
          </div>
        );
    }
}