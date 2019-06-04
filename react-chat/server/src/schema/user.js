// 准备工作
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 定义Schema
// 在Mongoose的设计理念中，Schema用来也只用来定义数据结构，具体对数据的增删改查操作都由Model来执行。
module.exports = new Schema({
    username: {type:String,required:true}, // 支持的数据类型,String Number Date Buffer Boolean Mixed Objectid Array
    password: {type:String,required:true},
    type: {type:String,required:true},
    avatar:{type:String},
    post:{type:String},
    info:{type:String},
    company:{type:String},
    salary:{type:String}
})

// 也可以这样增加 
// userSchema.add({isAdamin:Boolean})

// 暴露多个
// module.exports={
//     xx,xx,
// }