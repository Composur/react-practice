var express = require('express');
var router = express.Router();
const User=require('../models/user')
const md5=require('blueimp-md5')
const  filters={password:0,__v:0} //过滤返回前端属性
const {log,error}=console
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
        success:false,
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
      responseData.message='用户名已存在'
      res.json(responseData)
      return
    }
    const user=new User({username:username,password:password,type:type})
    user.save((err,result)=>{
      if(err){
        responseData.code=1
        responseData.message=err
        return
      }else{
        responseData.success=true
        responseData.message='注册成功'
        res.json(responseData)
        return
      }
    })
  })
})

// 插入数据测试
function testInsert(){
  // 先生成一个user
  const user1=new User({username:'admin',password:md5('admin'),type:'boss'})
  user1.save(function(err,user){
    if(err){
      error('-----------'+err+'-------------')
    }else{
      log(user)
    }
  })
}
// testInsert()

function deleteAll(){
  User.remove({username:'xiaozhi'}).then((result)=>{
    error(result)
  })
}
// deleteAll()



router.post('/login',function(req,res){

  const {username,password}=req.body

  User.findOne({username:username,password:password},filters).then((data)=>{

    if(data){

      responseData.code=1
      responseData.success = true
      responseData.message = '登录成功'
      responseData.payload = data
      res.cookie('user_id',data._id,{ maxAge:1000*60*60*24})
      res.json(responseData)
      return

    }else{
      responseData.code=0
      responseData.message='用户名或密码错误'
      res.json(responseData)
      return
    }

  }).catch((err)=>{
    log(err)
  })
})


module.exports = router;
