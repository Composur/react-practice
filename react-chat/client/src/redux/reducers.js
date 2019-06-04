/**
 * 根据老的state和和传入的actions生成新的state，一般会有多个reducer
 * 
 */

import {combineReducers} from 'redux'

export function loginUserInfo(previousState = {username:'',type:'',message:''}, action) { //管理user type=boss message err
   switch(action.type){
        case '':

        break;

        default:
        return previousState
        
   }
    
}


// 管理reduce
export default combineReducers({loginUserInfo}) 