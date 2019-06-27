const Chat=require('../models/chat')
module.exports = function (server) {
    const IO = require('socket.io')(server)
    let count=1
    IO.on('connection', function (socket) { //监听所有客户端的连接，全局的，一对多
        console.log('socket connect',count++)
        socket.on('sendMsg', function (data) { //监听某一个消息（sendMsg）的连接,自定义事件机制
            const create_time=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+ " "+new Date().toLocaleTimeString()
            const chat_id=[data.from,data.to].sort().join('_')
            data=Object.assign(data,{create_time},{chat_id})
            const chat=new Chat(data)
            chat.save().then(result=>{
                // 保存成功后向客户端发送 当前用户->目标用户
                // IO.emit('sendClientMsg',result)
                IO.emit('sendClientMsg',result)
            }).catch(e=>{
                console.log(e)
            })
        });
    })
}