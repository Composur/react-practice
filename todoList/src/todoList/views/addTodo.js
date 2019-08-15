import React, { Component } from 'react';
import {connect} from 'react-redux'
import { addTodo } from '../actons';
import PropTypes from 'prop-types';
class AddTodo extends Component {
  static propTypes={
    onAdd:PropTypes.func.isRequired
  }
 constructor(){
  super()
  this.state={
    value:''
  }
  this.onSubmit=this.onSubmit.bind(this)
  this.onInputChange=this.onInputChange.bind(this)
 }
 onSubmit(){
  const inputValue=this.state.value
  if(inputValue){
    this.props.onAdd(inputValue)
    this.setState({value:''})
  }else{
    alert('不能为空')
  }
 }
 onInputChange(e){
  this.setState({
    value:e.target.value
  })
 }
  render() {
    return (
      <div>
      <input onChange={this.onInputChange} value={this.state.value}/><button onClick={this.onSubmit}>增加</button>
      </div>
    );
  }
}


const mapDispatchToProps=(dispatch)=>({
  onAdd:(text)=>{
    dispatch(addTodo(text))
  }
})



export default connect(null,mapDispatchToProps)(AddTodo)