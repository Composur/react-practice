const mongoose=require('mongoose')
const {Schema}=mongoose
const BaseModel=require('./base')

const UserSchema=new Schema({
    // login info
    mobile:{unqie:true,type:String,required:true},
    password:{type:String,required:true},

    // user info
    name:{unqie:true,type:String,required:true},
    avatar:{type:String,default:'http://image.yujunren.com/avatar.jpg'},
    location:{type:String,default:''},
    signature:{type:String,default:''},

    // 积分
    score:{type:Number,default:0},

    // 星标用户-预留
    star:{type:Boolean,default:false},
    // 封号 - 管理员行为
    lock:{type:Boolean,default:false},

    // 统计
    topic_count:{type:Number,default:0},
    star_count:{type:Number,default:0},
    // 被收藏数量
    collect_count:{type:Number,default:0},
    // 累积回复数量
    reply_count:{type:Number,default:0},
    follower_count: { type: Number, default: 0 }, // 累计粉丝数
    following_count: { type: Number, default: 0 }, // 累计关注数


    // 管理员等级
    role:{type:Number,default:0},

    create_at:{type:Date,default:Date.now},
    update_at:{type:Date,default:Date.now},

    // 注销账户
    delete:{type:Boolean,default:false}
})
// 格式化日期
UserSchema.plugin(BaseModel)

UserSchema.index({mobile:1},{unqie:true})

UserSchema.index({score:-1});

UserSchema.virtual('isAdvanced').get(function(){
    return this.score>1000 || this.star
})

// mongoose 中间件
UserSchema.pre('save',function(next){
    this.update_at=new Date()
    next()
})

const User=mongoose.model('User',UserSchema)
// 初始化root账户与密码加盐
const bcrypt=require('./data/root')
if(process.env.NODE_ENV !=='test'){
    User.findOne((err,data)=>{
        if(err){
            console.log(err)
        }
        if(data){
            User.create({
                ...userData,
                password:bcrypt.hashSync(userData.password,bcrypt.genSaltSync(10))
            })
        } 
    })
}


module.exports=User