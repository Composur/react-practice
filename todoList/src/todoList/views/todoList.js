import React, { Component } from 'react';
import {connect} from 'react-redux'
import {FilterTypes} from '../../constants';
class TodoList extends Component {
  render() {
    const todos=this.props.todos
    console.log(todos)
    return (
      <ul>
        {
          todos.map((todo,index)=>{
           return(
             <li key={todo.id}>{todo.text}</li>
           ) 
          })
        }
      </ul>
    );
  }
}

const selectVisibleTodos = (todos, filter) => {
  switch (filter) {
    case FilterTypes.ALL:
      return todos;
    case FilterTypes.COMPLETED:
      return todos.filter(item => item.completed);
    case FilterTypes.UNCOMPPLETED:
      return todos.filter(item => !item.completed);
    default:
      throw new Error('unsupported filter');
  }
}

const mapStateToProps=(state)=>({ //需要过滤，几种不同的状态
  todos: selectVisibleTodos(state.todos,state.filter)
})

export default connect(mapStateToProps)(TodoList)
