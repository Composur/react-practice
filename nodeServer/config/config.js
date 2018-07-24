const path=require('path')
module.exports={
    'port':3000,
    "database": "mongodb://localhost/amss",
    'session_secret':'practice_secret',
    log_dir: path.join(__dirname, './server/logs'),
}