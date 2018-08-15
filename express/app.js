const Express=require('express')
const app=new Express()
// 改变console打印颜色
const chalk = require('chalk');
const cors=require('cors')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config=require('./config/config.default')
const Router=require('./routes/index')

// connect database
require('./config/dbConnect')

// middleware
app.use(cors)
// 接受任何类型的请求默认是string和array
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// cookie and session
app.use(cookieParser(config.session_secret))
app.use(session({
    store:new RedisStore(),
    name:'xutong',
    secret:config.session_secret,
    resave:true,
    saveUninitialized:false
}))

// Router
app.use(Router)

// start server
app.listen(config.server_port,()=>{
    console.log(chalk.bgCyanBright('the server is listening on port:'+chalk.white(config.server_port)))
})
module.exports=app;