var express = require('express');
var router = express.Router();



const User=require('../controller/user')
const Auth=require('../middleware/auth')
router.post('/register',User.register)
router.get('/login',User.login)
router.post('/updateUserInfo',User.updateUserInfo)
// 中间件判断是否登录或者有查看的权限
router.get('/info',Auth.userRequired,User.userInfo)
module.exports = router;
