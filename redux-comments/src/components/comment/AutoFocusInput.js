import React ,{Component}from 'react'
export default class AntoFocusInput extends Component{
    componentDidMount(){
        this.input.focus()
    }
    render(){
        return(
            <div>
                <input type="text" ref={(input)=>this.input=input} placeholder='进入页面自动focus'/>
                {this.props.content}
            </div>
        )
    }
}