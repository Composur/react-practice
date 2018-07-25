/**
 * 1.中间件拦截(在路由中加入拦截器，通过后在执行controller)
 * 2.判断用户的状态、是否登录、自身的角色
 */
class Auth {
    // auth user
    userRequired(req, res, next) {
        if (!req.session || !req.session.userInfo || !req.session.userInfo.id) {
            return res.send({
                status:0,
                type: 'ERROR_NO_SIGNIN',
                message: '尚未登录'
            })
        };
        next()
    }
}

module.exports=new Auth()