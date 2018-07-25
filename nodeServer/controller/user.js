// 图片上传
const formidable=require('formidable')
const bcrypt = require('bcryptjs');
const UserModel=require('../models/user.js')
const Base=require('./base')
class User extends Base{
   
    // 密码加盐

    async encryption(password){
        const salt=await bcrypt.genSalt(SALT_WORK_FACTOR);
        const hash=await bcrypt.hash(password,salt)
    }


    register(req,res){
        const form=new formidable.IncomingForm()
        form.parse(req,async(err,fields)=>{
            if(err){
                throw new Error(err)
            }
            const sms_code=req.session.sms_code || {};
            const {mobile,password,name,smscaptcha}=false;
            // 校验
            try {
                if(!mobile||!/^1[3,5,6,7,8,9]\w{9}$/.test(mobile)){
                    throw new Error('请输入正确的手机号')
                }else if(!password || !/(?!^(\d+[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?].{a,18}/.test(password)){
                    throw new Error('密码必须为数字、字母和特殊字符其中两种组成并且在6-18位之间');
                }else if(!name || name.length>8 || name.length<2){
                    throw new Error('请输入2-8位的昵称');
                }else if(sms_code.mobile!==mobile){
                    throw new Error('收取验证码的手机与登录手机不匹配');
                }else if(sms_code.code!==smscaptcha){
                    throw new Error('短信验证码不正确');
                }else if(Date.now()>sms_code.expired){
                    throw new Error('短信验证码已经失效了，请重新获取');
                }
            } catch (error) {
                return res.send({
                    status: 0,
                    type: 'ERROR_PARMAS_OF_SIGNUP',
                    message: error.message
                  });
            };
            let exitUser;
            exitUser=await UserModel.findOne({mobile})
            if(exitUser){
                return res.send({
                    status: 0,
                    type: 'MOBILE_HAS_BEEN_REGISTERED',
                    message: '手机号已经注册过了'
                })
            }
            exitUser=await UserModel.findOne({name})
            if(exitUser){
                return res.send({
                    status: 0,
                    type: 'NICKNAME_HAS_BEEN_REGISTERED',
                    message: '昵称已经注册过了'
                  });
            }
            
            const bcryptPassword=await this.encryption(password)
            const user={
                name,
                mobile,
                password:bcryptPassword
            };
            // 注册用户
            await UserModel.create(user)

            return res.send({
                status:1,
            })
        })
    }
    login(req,res){
        res.send('login')
    }
    // 用户信息
    userInfo(req,res,next){
        res.send({
            status:0,
            type:'ERR',
            message:'获取用户信息失败！'
        })
    }
}

module.exports = new User()