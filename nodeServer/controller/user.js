const formidable = require('formidable')
// 加盐
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.js')
const BehaviorModel = require('../models/behavior')
const TopicModel = require('../models/topic')
const Base = require('./base')
const SALT_WORK_FACTOR = 10;
class User extends Base {
    constructor(){
        // super代表父类的构造函数,
        super()// ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。因为子类没有自己的this而是继承父类的this
        this.register=this.register.bind(this)
        this.login=this.login.bind(this)
        this.forgetPass=this.forgetPass.bind(this)
        this.logout=this.login.bind(this)
        this.userInfo=this.userInfo.bind(this)
        this.updateUserInfo=this.updateUserInfo.bind(this)
        this.updatePass=this.updatePass.bind(this)
    }
    register(req, res) {
        // 创建一个form表单
        const form = new formidable.IncomingForm()
        // parse方法解析req中包含的form表单提交的数据
        form.parse(req, async (err, fields) => {
            if (err) {
                throw new Error(err)
            }
            const sms_code = req.session.sms_code || {};
            const {mobile, password, name, smscaptcha} = false;
            // 校验
            try {
                if (!mobile || !/^1[3,5,6,7,8,9]\w{9}$/.test(mobile)) {
                    throw new Error('请输入正确的手机号')
                } else if (!password || !/(?!^(\d+[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?].{a,18}/.test(password)) {
                    throw new Error('密码必须为数字、字母和特殊字符其中两种组成并且在6-18位之间');
                } else if (!name || name.length > 8 || name.length < 2) {
                    throw new Error('请输入2-8位的昵称');
                } else if (sms_code.mobile !== mobile) {
                    throw new Error('收取验证码的手机与登录手机不匹配');
                } else if (sms_code.code !== smscaptcha) {
                    throw new Error('短信验证码不正确');
                } else if (Date.now() > sms_code.expired) {
                    throw new Error('短信验证码已经失效了，请重新获取');
                }
            } catch (error) {
                return res.send({status: 0, type: 'ERROR_PARMAS_OF_SIGNUP', message: error.message});
            };
            let exitUser;
            exitUser = await UserModel.findOne({mobile})
            if (exitUser) {
                return res.send({status: 0, type: 'MOBILE_HAS_BEEN_REGISTERED', message: '手机号已经注册过了'})
            }
            exitUser = await UserModel.findOne({name})
            if (exitUser) {
                return res.send({status: 0, type: 'NICKNAME_HAS_BEEN_REGISTERED', message: '昵称已经注册过了'});
            }

            const bcryptPassword = await this.encryption(password)
            const user = {
                name,
                mobile,
                password: bcryptPassword
            };
            // 注册用户
            await UserModel.create(user)

            return res.send({status: 1})
        })
    }

    // 密码加盐
    async encryption(password) {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const hash = await bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                console.log(err)
            } else {
                console.log(hash)
            }
        })
    }

    // 登录
    login(req, res) {
        const from = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                throw new Error(err)
            }
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            // res.end(util.inspect({fields: fields, files: files}));

            const {mobile, password, issms, smscaptcha} = fields;

            if (!mobile || !/^1[3,5,7,8,9]\w{9}$/.test(mobile)) {
                return res.send({status: 0, type: 'ERROR_MOBILE_IS_INVALID', message: '请输入正确的手机号'})
            };
            const exitUser = await UserModel.findOne({mobile})
            if (!exitUser) {
                return res.send({status: 0, type: 'ERROR_USER_IS_NOT_EXITS', message: '该手机号尚未注册'})
            }
            if (issms) {
                const sms_code = req.session.sms_code || {};
                if (sms_code.mobile !== mobile) {
                    return res.send({status: 0, type: 'ERROR_PARAMS_SIGNIN', message: '获取验证码的手机号与登录手机号不一致'})
                } else if (sms_code.code !== smscaptcha) {
                    return res.send({status: 0, type: 'ERROR_PARAMS_OF_SIGNIN', message: '短信验证码不正确'})
                } else if (Date.now() >= sms_code.expired) {
                    return res.send({status: 0, type: 'ERROR_PARAMS_OF_SIGNIN', message: '短信验证码已经失效了，请重新获取'})
                };
                req.session.user = exitUser
                return res.send({status: 1, data: existUser});
            } else {
                const isMatch = bcrypt.compare(password, existUser.password);

                if (!isMatch) {
                    return res.send({status: 0, type: 'ERROR_PASS_IS_NOT_MATCH', message: '用户密码错误'});
                }

                req.session.user = existUser;
                return res.send({status: 1, data: existUser});
            }
        });
    }
    // 登出
    logout(req, res) {
        req.session.user = null;
        res.send({status: 1, type: 'LOGOUT', message: '退出成功'})
    }
    // 忘记密码
    forgetPass(req, res) {
        const form = new formidable.IncomingForm();
        // 注意是异步的代码
        form.parse(req, async (err, fields, files) => {
            if (err) {
                throw new Error(err)
            }
            const sms_code = req.session.sms_code || {}
            const {mobile, newPassword, smscaptcha} = fields;
            try {
                if (!mobile || !/^1[3,5,7,8,9]\w{9}$/.test(mobile)) {
                    throw new Error('请输入正确的手机号');
                } else if (!newPassword || !/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?].{6,18}/.test(newPassword)) {
                    throw new Error('新密码必须为数字、字母和特殊字符其中两种组成并且在6-18位之间');
                } else if (mobile !== sms_code.mobile) {
                    throw new Error('提交手机号与获取验证码手机号不对应');
                } else if (sms_code.code !== smscaptcha) {
                    throw new Error('验证码错误');
                } else if (Date.now() > sms_code.expired) {
                    throw new Error('验证码已失效，请重新获取');
                }
            } catch (error) {
                res.send({status: 0, type: 'ERROR_PARMAS_OF_FORGET_PASS', message: error.message})
            }
            // await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。
            const exitUser = await UserModel.findOne({mobile}).catch(err=>{
                console.log(err)
            })
            if (!exitUser) {
                return res.send({status: 0, type: 'ERROR_USER_IS_NOT_EXITS', message: '尚未注册'})
            }
            // await
            const bcryptPassword = await this.encryption(newPassword)
            exitUser.password = bcryptPassword;
            // await
            await exitUser.save();
            return res.send({status: 1});
        });
    }

    // 用户信息
    userInfo(req, res, next) {
        // 获取当前session中的用户信息
        res.send({status: 1, data: req.session.user})
    }
    // 更新个人信息
    updateUserInfo(req, res, next) {
        const form = formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
            if (err) {
                throw new Error(err)
            }
            try {} catch (error) {}
            const {id, name: currentName} = req.session.user;
            const {name} = fields
            const exitUser = await UserModel.findOne({name})
            if (exitUser && name !== currentName) {
                return res.send({status: 0, type: 'NICKNAME_HAS_BEEN_REGISTERED', message: '昵称已经注册过了'})
            }
            // 更新资料
            const doc = await UserModel.findByIdAndUpdate(id, {
                ...fields
            }, {new: true})
            req.session.user = doc;
            return res.send({status: 1, message: '更新成功'})
        })
    }
    // 修改密码
    updatePass(req, res) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                throw new Error(err)
            }
            const {id} = req.session.id;
            const {oldPass, newPass} = fields
            try {
                if (!oldPass) {
                    throw new Error(err)
                } else if (!newPass || !/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?].{6,18}/.test(newPass)) {
                    throw new Error('新密码必须为数字、字母和特殊字符其中两种组成并且在6-18位之间');
                }
            } catch (error) {
                return res.send({status: 0, type: 'ERROR_PARMAS_OF_UPDATE_PASS', message: error.message})
            }
            const exitUser = UserModel.findById(id)
            // 旧密码的校验
            const isMatch = bcrypt.compare(oldPass, exitUser.password)

            if (isMatch) {
                const bcryptPassword = await this.encryption(newPass)
                exitUser.password = bcryptPassword
                await exitUser.save()
                return res.send({status: 1, message: '密码修改成功'})
            } else {
                return res.send({status: 0, type: 'ERROR_PASSWORD_IS_NOT_MATCH', message: '旧密码错误'})
            }
        })
    }
}

module.exports = new User()