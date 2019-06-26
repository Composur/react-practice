// 准备工作
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 定义Schema
// 在Mongoose的设计理念中，Schema用来也只用来定义数据结构，具体对数据的增删改查操作都由Model来执行。
module.exports = new Schema({
    from: {type:String,required:true}, 
    to: {type:String,required:true},
    chat_id: {type:String,required:true}, //from的ID发送给to的ID，组成的字符串
    content: {type:String,required:true},
    read: {type:Boolean,required:false},
    create_time: {type:Number ,required:true},
})
