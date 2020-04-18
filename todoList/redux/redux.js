/**
 * @description 自定义reducer
 * @param reducer Object
 */

// reducer是一个纯函数，接收 state 和 action 返回新的 state

export const combinReducer = (reducers) => {

  // 返回一个合成的reducer函数，接收的 state 是 store
  return (state, action) => {

   return Object.keys(reducers).reduce((pre, reducerItem) => {

       //调用每个reducer返回的对象，存到总的reducers中
      pre[next] = reducers[reducerItem](state[reducerItem], action)

      return pre

    }, {})

  }
}