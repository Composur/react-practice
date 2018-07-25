const mongoose=require('mongoose')
const config=require('../config/config')
const BaseModel=require('./base')
const {Schema}=mongoose
const {ObjetId}=Schema

const TopicSchema=new Schema({
    // 话题信息
    title:{type:String,required:true},
    content:{type:String,required:true},
    author_id:{type:ObjectId,required:true},

    // 话题类型，置顶、精华
    top:{type:Boolean,default:false},
    good:{type:Boolean,default:false},

    // 封贴
    lock:{type:Boolean,default:false},

    // 统计
    star_count:{type:Number,default:0},//收到的赞
    collect_count:{type:Number,default:0},//被收藏的数量
    reply_count:{type:Number,default:0},//获得的回复
    vist_count:{type:Number,default:0},//被查看次数

    // 最后一次回复-排序显示
    last_reply:{type:ObjectId},
    last_reply_at:{type:Date,default:Date.now},

    // 类型
    tab:{type:String},

    // 创建和更新时间
    create_at:{type:Date,default:Date.now},
    update_at:{type:Date,default:Date.now},

    // 删除话题
    delete:{type:Boolean,default:false}
})

TopicSchema.plugin(BaseModel)

TopicSchema.index({create_at:-1})//按创建的时间倒序索引
TopicSchema.index({top:-1,last_reply_at:-1})
TopicSchema.index({author_id:-1,create_at:-1})

TopicSchema.virtual('tabName').get(function(){
    const pair=config.tabs.find(item=>{
        item.url==this.tab
    })
    return pair?pair.name:'';
})
