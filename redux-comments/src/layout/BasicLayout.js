import React,{Component} from 'react'

export default class BasicLayout extends Component{
    constructor(props) {
        super()
        this.state={
            isLike:false
        }
    }
    handlerClickButton() {
        this.setState((pre)=>{
            return {
                isLike:!this.state.isLike
            }
        })
    }
    render(){
        return(
            <div onClick={this.handlerClickButton.bind(this)}>{this.state.isLike?'取消':'点赞'}👍</div>
        )
    }
}
