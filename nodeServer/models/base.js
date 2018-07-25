// 处理日期的格式
const moment = require('moment');
require('moment/locale/zh-cn.js')
// 修改Mongoose查询返回的对象
module.exports = function (schema) {
    schema.methods.create_at_ago = function () {
        return moment(this.create_at).toNow()
    }
    schema.methods.last_reply_at_ago = function () {
        return moment(this.last_reply_at).toNow()
    }
    schema.options.toObject = schema.options.toJSON = {
        transform: function (doc, ret, options) {
            ret.id=ret._id;
            ret.create_at=moment(ret.create_at).format('YYYY-MM-DD HH:mm')
            ret.update_at=moment(ret.create_at).format('YYYY-MM-DD HH:mm')
            ret.id=ret._id;
            delete ret._id;
            delete ret._id;
        }
    }
}