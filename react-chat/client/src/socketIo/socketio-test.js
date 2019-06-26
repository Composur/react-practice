import io from 'socket.io-client'
import {socketUrl} from '../config/config.default'
const socket=io(socketUrl) //连接服务端

socket.on('sendMsg',function(data){ //浏览器监听接收服务器发来的消息，前后端消息名称要一致
    console.log('browser reveives message form the server',data)
})
socket.emit('sendMsg',{name:'xiaozhi',date:new Date()},function(data){ //浏览器向服务器发送消息
    console.log('browser send',data)
})
