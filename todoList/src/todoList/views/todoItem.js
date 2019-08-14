import React from 'react';
export const TodoItem=({id,text,completed,onRemoveTodo,onToggleTodo})=>{
  return(
    <li 
      key={id}
      style={ {
        textDecoration: completed?'line-through':'none'
        }} 
    >
      <label>
        <input type="checkbox" checked={completed?'checked':null} onClick={onToggleTodo}/>{text}
        <button onClick={onRemoveTodo}>X</button>
      </label>
    </li>
  )
}