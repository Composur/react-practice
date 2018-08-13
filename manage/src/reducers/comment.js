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
                comments:[
                    ...state.comments,
                    action.comment
                ]
            }
        case DELETE_COMMENT:
            return{
                comments:[
                    ...state.comments.slice(0,action.commentIndex),
                    ...state.comments.slice(action.commentIndex+1)
                ]
            }
        default:
            return state
    }
}