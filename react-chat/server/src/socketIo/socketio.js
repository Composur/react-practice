module.exports = function (server) {
    const IO = require('socket.io')(server)
    let count=1
    IO.on('connection', function (socket) { //监听所有客户端的连接，全局的，一对多
        console.log('socket connect',count++)
        socket.on('sendMsg', function (data) { //监听某一个消息（sendMsg）的连接,自定义事件机制
            console.log('server receives ', data)
            IO.emit('sendMsg', data.name + '_' + data.date)
            console.log('server send browser', data)
        });
    })
}