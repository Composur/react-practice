const mongoose = require('mongoose')

// 对象的解构赋值
const {Schema} = mongoose
const {ObjectId} = Schema
// console.log(ObjectId)
const BaseModel = require('./base')

/*
* 根据类型区分行为 action(用户的行为)
* 1. create 创建了
* 2. star 喜欢了
* 3. collect 收藏了
* 4. follow 关注了
*/

const Behavior = new Schema({
    action: {
        type: String,
        required: true
    },
    anthor_id: {
        type: ObjectId, //点赞的发起人
        required: true
    },
    target_id: {
        type: ObjectId, //被赞的人
        required: true
    },
    is_un: {
        type: Boolean,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
})
Behavior.plugin(BaseModel)


// mongoose设置索引
//1 表示正序, -1 表示逆序
Behavior.index(
    {
        action:1,
        author_id:1,
        target_id:1
    },
    {
        unique:true,
    }
)
Behavior.index({author_id:1,create_at:-1})

// 虚拟设置或读取文档的属性不会持久的保存
Behavior.virtual('actualAction').get(function(){
    return this.is_un ? `un_${this.action}`:this.action;
})

const BehaviorModle=mongoose.model('Behavior',Behavior)
module.exports=BehaviorModle