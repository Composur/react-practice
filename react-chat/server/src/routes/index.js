var express = require('express');
var router = express.Router();
const User=require('../models/user')

// 统一错误处理
router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 统一返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: '',
    }
    next();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/**
 * 1.获取请求参数
 * 2.处理
 * 3.返回响应体 {code:1/0,data:{xxx}} 0成功 1失败
 */

router.post('/register',function(req,res){
  const {username,password,type}=req.body
  User.findOne({
    username:username
  }).then(e=>{
    if(e){
      responseData.code=1
      responseData.message='用户名已存在'
      res.json(responseData)
      return
    }
  })
})

router.get('/login',function(req,res){
  const {username,password}=req.query
  console.log(req.query)
  if(username=='x'){
    res.send({
      code:'1',
      success:true
    })
  }else{
    res.send({
      code:'0',
      success:false,
      msg:'密码错误'
    })
  }
})


module.exports = router;
