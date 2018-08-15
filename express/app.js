const Express=require('express')
const app=new Express()
const chalk = require('chalk');
const config=require('./config/config.default')

// connect database
require('./config/dbConnect')


// start server
app.listen(config.server_port,()=>{
    console.log(chalk.bgCyanBright('the server is listening on port:'+chalk.white(config.server_port)))
})