import React ,{Component}from 'react'
import ReactDOM from 'react-dom'

import Hello from '@/hello'

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number}>{number}</li>
);

const vals={
    name:'tom',
}

class Text extends Component{
    render(){
        return(
           <div>
           <Hello {...vals}/>
           <ul>{listItems}</ul>
           </div>
        )
    }
}


ReactDOM.render(<Text/>,document.getElementById('app'))