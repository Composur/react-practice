const path=require('path')
module.exports={
    port:3011,
    database: "mongodb://localhost/amss",
    session_secret:'practice_secret',
    log_dir: path.join(__dirname, './server/logs'),
    tabs: [
        { name: '分享', url: 'share' },
        { name: '问答', url: 'ask' },
        { name: '招聘', url: 'offer' }
      ]
    
}