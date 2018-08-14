
/**
 * 1、定义 action types
 * 2、编写 reducer
 * 3、跟这个 reducer 相关的 action creators
 * 4、reducer的编写准则
 */ 

/**
 * 1、增加评论
 * 2、删除评论
 * 3、初始化评论（从localstorage去读commet）
 */ 
// 用三个常量来描述action.type
const INIT_COMMENT='INIT_COMMENT'
const ADD_COMMENT='ADD_COMMENT'
const DELETE_COMMENT='DELETE_COMMENT'

export default function(state,action){
    // 为空新建一个对象
    if(!state){
         state={
            comments:[]
        }
    }
    switch(action.type){ 
        case INIT_COMMENT:
            return {comments:action.comments}
        case ADD_COMMENT:
            return{
                // 复制原来的state.comments 然后在数组中追加add的comment
                comments:[
                    ...state.comments,
                    action.comment
                ]
            }
        case DELETE_COMMENT:
            return{
                /**
                 *1、 [1,2,3,4].slice(0,2)
                  2、 [1, 2]
                  3、 [1,2,3,4].slice(3)
                  4、 [4]
                 */ 
                //删除下标进行合并
                comments:[
                    ...state.comments.slice(0,action.commentIndex),
                    ...state.comments.slice(action.commentIndex+1)
                ]
            }
        default:
            return state
    }
}
// action creators
// 特定的 action 只会影响特定的 reducer
export const initComments=(comments)=>{
    return {type:INIT_COMMENT,comments}
}
export const addComments=(comments)=>{
    return {type:ADD_COMMENT,comments}
}
export const deleteComments=(comments)=>{
    return {type:DELETE_COMMENT,comments}
}