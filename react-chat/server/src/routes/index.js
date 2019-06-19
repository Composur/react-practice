var express = require('express');
var router = express.Router();
const User=require('../models/user')
const md5=require('blueimp-md5')
const filters = { //过滤返回前端属性
  password: 0,
  __v: 0
}
const filtersByID={
   "fields": {
    password: 0,
    __v: 0
  },
  "new": true
}
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
        responseData.payload=result
        res.cookie('user_id',result._id,{ maxAge:1000*60*60*24})
        res.json(responseData)
        return
      }
    })
  })
})



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


// boss用户 信息更新
router.post('/userUpdate',function(req,res){
  const _id=getCookie(req,res)
  // const {avatar,salary,info,post} =req.body 留着前端做数据校验
  User.findByIdAndUpdate({_id:_id},{$set:req.body},filtersByID).then(data=>{
    debugger
    if (data) {
      responseData.code = 1
      responseData.success = true
      responseData.message = '修改成功'
      responseData.payload = data
      res.json(responseData)
      return

    } else { // 如果是无效的cookie查不到数据

      res.clearCookie()
      responseData.message = '请登录！'
      res.json(responseData)
      return

    }
  })
})


// normal 用户信息更新

router.post('/normalUpdate',function(req,res){

  const _id=getCookie(req,res)

  User.findByIdAndUpdate({_id:_id},req.body,filtersByID).then(data=>{

    if (data) {
      responseData.code = 1
      responseData.success = true
      responseData.message = '修改成功'
      responseData.payload = data
      res.json(responseData)
      return

    } else { // 如果是无效的cookie查不到数据

      res.clearCookie()
      responseData.message = '请登录！'
      res.json(responseData)
      return

    }
  })

})


function getCookie(req,res){
 // get user_id
 const _id=req.cookies.user_id
 if(!_id){
   responseData.message='请登录！'
   res.json(responseData)
   return
 }else{
   return _id
 }
}

module.exports = router;
