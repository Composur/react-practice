import React, {Component} from 'react'
import CommentIput from './CommentIput'
import CommentList from './CommentList'
import Clock from './lock'
import AntoFocusInput from './AutoFocusInput'
export default class Comment extends Component {
    constructor(){
        super()
        this.state={
            comments:[],
            isShowClock:true
        }
    }
    handleSubmitComment(comment){
        if(!comment) return;
        if(!comment.username){
            alert('请输入用户名！')
        }else if(!comment.content){
            alert('请输入评论内容！')
            return  
        }   
        this.state.comments.push(comment)
        this.setState({
           comments:this.state.comments
       })
    }
    isShowClock() {
        this.setState({
            isShowClock:!this.state.isShowClock
        })
    }
    render(){
        return(
            <div className='wrapper'>
            <CommentIput onSubmit={this.handleSubmitComment.bind(this)}/>
            <CommentList comments={this.state.comments}/>
            <div>
            {this.state.isShowClock?<Clock/>:null}
            <button onClick={this.isShowClock.bind(this)}>ClockToggle</button>
            </div>
            <AntoFocusInput content={<div>tset</div>}/>
            </div>
        )
    }
}