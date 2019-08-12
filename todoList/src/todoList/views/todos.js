import React, { Component } from 'react'
import AddTodo from './addTodo';
import TodoList from './todoList'
export default class extends Component {
  render() {
    return (
      <div>
        <AddTodo/>
        <TodoList/>
      </div>
    )
  }
}


