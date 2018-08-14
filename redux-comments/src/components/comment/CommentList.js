import React ,{Component} from 'react'
import Comment from './Comment'
import ProTypes from 'prop-types'
export default class CommentList extends Component{
   static ProTypes={
       comments:ProTypes.array,
       onDeleteComment:ProTypes.func
   }
    static defaultProps ={
        comments:[]
    }
   handleDeleteComment(index) {
    if(this.props.onDeleteComment){
        this.props.onDeleteComment(index)
    }
   }
    render() {
        
        return (
            <div>
                {this.props.comments.map((comment, i) => <Comment comment={comment} key={i} index={i} onDeleteComment={this.handleDeleteComment.bind(this)}/>)}
            </div>
        )
      }
}