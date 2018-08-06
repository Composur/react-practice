import React, {Component} from 'react'
import ProTypes from 'prop-types'
export default class Comment extends Component {
    static proTypes={
        comment:ProTypes.object.isRequired
    }
    render() {
        const {comment}=this.props
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{comment.username}
                    </span>：
                </div>
                <p>{comment.content}</p>
            </div>
        )
    }
}
