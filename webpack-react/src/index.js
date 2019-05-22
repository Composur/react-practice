import React ,{Component}from 'react'
import ReactDOM from 'react-dom'

import Hello from '@/components/hello'
import '@/style/index'


const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number}>{number}</li>
);

const vals={
    name:'tom',
}

// function Text(){
//     return(
//         <div>
//         <Hello {...vals}/>
//         <ul>{listItems}</ul>
//         </div>
//     )
// }

class Text extends Component{
    constructor(){
        super()
        this.state={
            name:'test'
        }
    }
    render(){
        this.state.name='1234'
        return(
           <div>
           <p>{this.state.name}</p>
           <Hello {...vals}/>
           <ul>{listItems}</ul>
           </div>
        )
    }
}

// 用构造函数创建出来的组件叫做无状态组件
// 用class创建出来的组件叫做有状态组件

// 二者的区别是有无state属性和是否有私有属性和声明周期函数

// props来源于外界，只读，state是组件私有的，可以修改


ReactDOM.render(<Text/>,document.getElementById('app'))