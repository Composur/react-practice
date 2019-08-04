import {connect} from 'react-redux'
import {addTodo,toggleTodo,removeTodo} from '../actons'
import  {Todos}  from './component';
export default connect(state=>({
  todoList:state.todoList
}),{addTodo,toggleTodo,removeTodo})(Todos)