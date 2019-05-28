/**
 * 根据老的state和和传入的actions生成新的state，一般会有多个reducer
 * 
 */

import {combineReducers} from 'redux'

export function loginUserInfo(previousState = {key:'in'}, action) {
    // if (action.type === GET_LOGIN_USER_INFO || action.type === LOGIN) {
    //     return action.data.userInfo || {}
    // } else if (action.type === LOGOUT) {
    //     return {}
    // } else {
    //     return previousState
    // }
    return previousState
}
export function loginOut(previousState = {key:'out'}, action) {
    return previousState
}


// export const makeRootReducer = (asyncReducers) => {
//     const appReducer = combineReducers({
//         loginUserInfo,
        
//     })
//     return (state, action) => {
//         if (action.type === 'LOGOUT') {
//           state = undefined
//         }
//         return appReducer(state, action)
//       }
// }
export default combineReducers({loginUserInfo,loginOut})