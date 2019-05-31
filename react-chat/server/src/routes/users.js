var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * 1.获取请求参数
 * 2.处理
 * 3.返回响应体 {code:1/0,data:{xxx}} 0成功 1失败
 */

router.post('/register',function(req,res){
  console.log(req.body)
  const {username,password,type}=req.body
  res.send({
    code:0,
    data:{

    }
  })
})



module.exports = router;
