const path = require('path');
// 日志管理模块
const log4js = require('log4js');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'development';

log4js.configure({
  appenders: { cheese: { type: 'file', filename: path.join(config.log_dir, 'cheese.log') } },
  categories: { default: { appenders: ['cheese'], level: config.debug && env !== 'test' ? 'debug' : 'error' } }
});

const logger = log4js.getLogger('cheese');

module.exports = logger;

