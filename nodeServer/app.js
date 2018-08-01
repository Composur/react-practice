var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

const bodyParse=require('body-parser')
const session = require('express-session');
const connectMongo = require('connect-mongo');
const Router=require('./routes/index')
// default config
const config=require('./config/config')
// connect mongodb 
require('./mongoose/mongo')


app.use(logger('dev'));


app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


// cookie and session
// 解析`cookie`、设置`session`并保存于`MongoDB`数据库中
const MongoStore=connectMongo(session)
// cookie加密
app.use(cookieParser(config.session_secret));
app.use(session({
  name:'practice',//默认connect.id
  secret:config.session_secret,//签名 随便写
  resave:true,//如果没有修改不保存session
  saveUninitialized:false,
  cookie:{
    httpOnly:true,
    secure:false,//true的话只有在https才可以访问
    maxAge:2592000000,
    signed:true
  },
  // 把session信息保存到数据库中，为了负载均衡Nginx转发到不同的服务器也可以从数据库获取的session信息
  store:new MongoStore({
    url:config.database
  })
}))



// cros 
const ALLOW_ORIGIN=[
  'localhost:3000',
  'localhost:3001',
  'localhost:3002',
  'localhost:3010',
  'localhost:3011',
]

app.all("*",function(req,res,next){
  const reqOrigin=req.headers.origin || req.headers.host

  if(ALLOW_ORIGIN.includes(reqOrigin)||env==='development'){
    res.header('Access-Control-Allow-Origin', reqOrigin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('X-Powered-By', '3.2.1');
    if(req.method==='OPTIONS'){
      res.sendStatus(200)
    }else{
      next()
    }
  }else{
    res.send({
      status:0,
      type:'ILLEGAL DOMAIN NAME',
      message:'请求域名未允许！'
    })
  }
})

// Router
app.use('/api',Router)

const handler=require('./middleware/ErrorHandle')
// 404 500
app.use(handler.error404)
app.use(handler.error500)


module.exports = app;
