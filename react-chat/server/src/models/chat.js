const mongoose = require('mongoose')
const chatSchema = require('../schema/chat')

// 利用model进行增删改查的操作 model与集合对应可以操作集合

module.exports = mongoose.model('Chat', chatSchema) 