import React ,{Component} from 'react'
import './button.css'
export default class Button extends Component{

  render(){
      return(
          <div>
              <button className='btn'>{this.props.value}</button>
          </div>
      )
  }
}
