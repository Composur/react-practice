import React, {Component} from 'react'
import CommentIput from './CommentIput'
import CommentList from './CommentList'
export default class Comment extends Component {
    constructor(){
        super()
        this.state={
            comments:[]
        }
    }
    handleSubmitComment(comment){
        this.state.comments.push(comment)
        this.setState({
           comments:this.state.comments
       })
    }
    render(){
        return(
            <div className='wrapper'>
            <CommentIput onSubmit={this.handleSubmitComment.bind(this)}/>
            <CommentList comments={this.state.comments}/>
            </div>
        )
    }
}