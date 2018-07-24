var express = require('express');
var router = express.Router();



const User=require('../controller/user')

router.post('/register',User.register)
router.get('/login',User.login)

module.exports = router;
