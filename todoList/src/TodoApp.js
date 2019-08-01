import React, { Component } from 'react'
import {view as Todos} from './todoList'
import {view as Filter } from './filter'

export default class TodoApp extends Component{
  render(){
    return(
      <div>
        <Todos></Todos>
        <Filter></Filter>
      </div>
    )
  }
}
