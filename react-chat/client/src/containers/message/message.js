import React,{Component} from 'react'
export default class message extends Component {
    state = {  }
    render() {
        const messageStyle={
            marginTop:'50px',
            marginBottom:'50px'
        }
        return (
            <div style={messageStyle}>
            <h1>message</h1>
            </div>
        );
    }
}