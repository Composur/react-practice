import React, {Component} from 'react'
import ProTypes from 'prop-types'
export default class Comment extends Component {
    static proTypes = {
        comment: ProTypes.object.isRequired
    }
    constructor() {
        super()
        this.state = {
            timeString: ''
        }
    }

    componentWillMount() {
        // 自动更新时间戳
        this._updateTimeString()
        this._time = setInterval(() => {
            this
                ._updateTimeString
                .bind(this)
        }, 5000)
    }
    componentWillUnmount() {
        clearInterval(this._time)
    }
    _updateTimeString() {
        let comment = this.props.comment
        let duration = (+ Date.now() - new Date(comment.createdTime)) / 1000
        this.setState({
            timeString: duration > 60
                ? `${Math.round(duration / 60)}分钟前`
                : `${Math.round(Math.max(duration, 1))} 秒前`
        })
    }
    handleDeleteComment() {
        if (this.props.onDeleteComment) {
            this
                .props
                .onDeleteComment(this.props.index)
        }
    }
    _getProcessedContent(content) {
         return content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }
    render() {
        let {comment} = this.props
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{comment.username}
                    </span>：
                </div>
                <p
                    dangerouslySetInnerHTML={{
                    __html: this._getProcessedContent(comment.content)
                }}></p>
                <span className='comment-createdtime'>
                    {this.state.timeString}
                </span>
                <span
                    className='comment-delete'
                    onClick={this
                    .handleDeleteComment
                    .bind(this)}>删除</span>
            </div>
        )
    }
}
