import io from 'socket.io-client'
import {socketUrl} from '../config/config.default'
let socket=null



 // 初始化socket连接
 export const initIO=(dispatch,userid,callback)=>{
  if(!socket){
    socket=io(socketUrl)
    socket.on('sendClientMsg',function(data){ //浏览器监听接收服务器发来的消息，前后端消息名称要一致
      if (data.from === userid || data.to === userid) { //只有当前消息是自己的消息在进行分发
        dispatch(callback(data)) //分发单条信息，聊天界面用
        console.log('浏览器收到', data)
      }
    })
    return socket
  }
}
