import React, {Component} from 'react'
import PropTypes from 'prop-types'
export default class CommentIput extends Component {
    static propTypes={
        onSubmit:PropTypes.func,
        username:PropTypes.any,
        onUserNameInputBlur:PropTypes.func
    }
    static defaultProps={
        username:''
    }
    // state 是让组件控制自己的状态，props 是让外部对组件自己进行配置。
    constructor(props){
        super(props);
        this.state={
            username:props.username,//增加复用性从props上取的字段
            content:''
        }
    }
    // componentWillMount(){
    //     this._loadUsername()
    // }
    // _loadUsername(){
    //     const username=localStorage.getItem('username')
    //     if(username){
    //         this.setState({
    //             username
    //         })
    //     }
    // }
    handleUsernameChange(e){
        this.setState({
            username:e.target.value,
        })
    }
    handleContentChange(e){
        this.setState({
            content:e.target.value
        })
    }
    _saveUsername(username){
        localStorage.setItem('username',username)
    }
    handleUsernameBlur(e){
        this._saveUsername(e.target.value)
    }
    handleSubmit(){
        if(this.props.onSubmit){
            const {username,content}=this.state
            this.props.onSubmit({username,content,createdTime:new Date()})
        }
        this.setState({
            content:''
        })
    }
    componentDidMount(){
        this.textarea.focus()
    }
    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input value={this.state.username} onBlur={this.handleUsernameBlur.bind(this)}  onChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea value={this.state.content} onChange={this.handleContentChange.bind(this)} ref={(textarea)=>this.textarea=textarea}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}