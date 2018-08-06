import React, {Component} from 'react'
import CommentIput from './CommentIput'
import CommentList from './CommentList'
import Clock from './lock'
import AntoFocusInput from './AutoFocusInput'
import Cart from './Cart'
export default class Comment extends Component {
    constructor(){
        super()
        this.state={
            comments:[],
            isShowClock:true,
        }
    }
    componentWillMount(){
        this._loadComments()
    }
    _loadComments(){
        let comments=localStorage.getItem('comments')
        if(comments){
            comments=JSON.parse(comments)
            this.setState({comments})
        }else{
            return
        }
    }
    _saveComments(comments){
        localStorage.setItem('comments',JSON.stringify(comments))
    }
    handleSubmitComment(comment){
        if(!comment) return;
        if(!comment.username){
            alert('请输入用户名！');
            return; 
        }else if(!comment.content){
            alert('请输入评论内容！')
            return  
        } 
        const comments=this.state.comments
        comments.push(comment)
        this.setState({comments})
    //    localStorage
       this._saveComments(comments)
    }
    isShowClock() {
        this.setState({
            isShowClock:!this.state.isShowClock
        })
    }
    handleDeleteComment(index) {
        const comments=this.state.comments
        comments.splice(index,1)
        this.setState({comments})
        this._saveComments(comments)
    }
    render(){
        return(
            <div className='wrapper'>
            <CommentIput onSubmit={this.handleSubmitComment.bind(this)}/>
            <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment.bind(this)}/>
            <div>
            {this.state.isShowClock?<Clock/>:null}
            <button onClick={this.isShowClock.bind(this)}>ClockToggle</button>
            </div>
            <Cart/>
            </div>
        )
    }
}