import React, { Component } from 'react';
import {connect} from 'react-redux'
import {selectVisibleTodos} from '../selector'
class TodoList extends Component {
  render() {
    const todos=this.props.todos
    console.log(todos)
    return (
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    );
  }
}

const mapStateToProps=(state)=>({
  // todos: selectVisibleTodos(state)
})

export default connect(mapStateToProps)(TodoList)
