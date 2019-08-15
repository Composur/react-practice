import React, { Component } from 'react';
import {connect} from 'react-redux'
import {removeTodo,toggleTodo} from '../actons'
import {FilterTypes} from '../../constants';
import { TodoItem } from './todoItem';

class TodoList extends Component {
  render() {
    const {todos,onRemoveTodo,onToggletodo}=this.props
    console.log(this.props)
    return (
      <ul>
        {
          todos.map((todo)=>{
           return(
            <TodoItem key={todo.id} text={todo.text} completed={todo.completed} onRemoveTodo={()=>onRemoveTodo(todo.id)} onToggleTodo={()=>onToggletodo(todo.id)}/>
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
    case FilterTypes.UNCOMPLETED:
      return todos.filter(item => !item.completed);
    default:
      throw new Error('unsupported filter');
  }
}

const mapStateToProps=(state)=>({ //需要过滤，几种不同的状态
  todos: selectVisibleTodos(state.todos,state.filter)
})

const mapDispatchToProps=(dispatch)=>{
  return{
    onRemoveTodo:(id)=>{
      dispatch(removeTodo(id))
    },
    onToggletodo:(id)=>{
      dispatch(toggleTodo(id))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoList)
