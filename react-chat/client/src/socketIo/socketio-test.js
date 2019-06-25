import io from 'socket.io-client'

const socket=io('ws://localhost:8081')

socket.on('sendMsg',function(data){ //浏览器接收服务器发来的消息
    console.log('browser reveives message form the server',data)
})
socket.emit('sendMsg',{name:'xiaozhi',date:new Date()},function(data){ //浏览器向服务器发送消息
    console.log('browser send',data)
})
