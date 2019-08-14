import {
  TOGGLE_TODO,
  ADD_TODO,
  REMOVE_TODO
} from './actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [ //不修改state字段，返回一个新的添加传入action的数组
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      const currentId = state[action.id].id
      return state.map(item => {
        if (currentId === action.id) {
          return {
            ...item,
            completed: !action.completed
          } //展开运算符，后面complete字段会覆盖当前展开对象的complete
        } else {
          return item
        }
      })
    case REMOVE_TODO:
      return state.filter(item => {
        return item.id !== action.id
      })
    default:
      return state
  }
}