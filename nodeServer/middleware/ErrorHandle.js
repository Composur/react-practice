const  handler={
     error404:(req,res)=>{
        res.status(404).send({
            status: 0,
            type: 'ERROR_NOT_FIND_THAT',
            message: '找不到请求资源'
        })
    },
     error500:(req,res)=>{
        res.status(500).send({
            status: 0,
            type: 'ERROR_SERVICE',
            message: '服务器无响应，请稍后重试'
          });
    }
}
module.exports=handler