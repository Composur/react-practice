import React,{Component} from 'react'


export default class Hello extends Component{
    constructor(props){ //构造函数的作用就是每当new这个类的时候先执行构造函数的代码 
        super(props)
    }
    render(){
        return(
            <div {...this.props}>props</div>
        )
    }
}