import React, { Component } from 'react';
import {Button} from 'antd-mobile'
export default class Error extends Component {
    state = {  }
    constructor(){
        super()
        this.handle=this.handle.bind(this)
    }
    handle(){
        this.props.history.replace('/')
    }
    render() {
        return (
            <div>
                <h1>404</h1>
                <Button onClick={this.handle} type='primary'>返回首页</Button>
            </div>
        );
    }
}