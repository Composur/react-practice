import React, {Component} from 'react'
import CommentIput from './CommentIput'
import CommentList from './CommentList'
export default class Comment extends Component {
    handleSubmitComment(comment){
        console.log(comment)
    }
    render(){
        return(
            <div className='wrapper'>
            <CommentIput onSubmit={this.handleSubmitComment.bind(this)}/>
            <CommentList/>
            </div>
        )
    }
}