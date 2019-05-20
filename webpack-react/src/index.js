import React ,{Component}from 'react'
import ReactDOM from 'react-dom'

let num=100
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

class Text extends Component{
    render(){
        return(
           <div>
           <h1>{num}</h1>
           <ul>{listItems}</ul>
           </div>
        )
    }
}


ReactDOM.render(<Text/>,document.getElementById('app'))