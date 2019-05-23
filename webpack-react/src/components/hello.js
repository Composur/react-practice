import React,{Component} from 'react'
import { timingSafeEqual } from 'crypto';


export default class Hello extends Component{
    constructor(props){ //构造函数的作用就是每当new这个类的时候先执行构造函数的代码 
        super(props)
        this.state={
            name:props.name
        }
        this.click=this.click.bind(this)
        this.onChange1=this.onChange1.bind(this)
    }
    click(){
       this.setState({
           name:'haha'
       },function(){
           console.log(this.state.name) //最新的state
       })
    }
    onChange1(e){
        console.log(e.target.value)
        this.setState({
            name:e.target.value
        })
        console.log(this.refs.input)
    }
    say(){

    }
    render(){
        return(
            <div {...this.props}>
                <button onClick={this.click}>点击</button>
                <p>{this.state.name}</p>
                <input onChange={this.onChange1} value={this.state.name} ref='input'></input>
            </div>
        )
    }
}