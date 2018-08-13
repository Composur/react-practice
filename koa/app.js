const koa=require('koa')
const app=new koa()
app.use((ctx)=>{
    ctx.body='test'
})
app.listen('9000',()=>{
    console.log(9000)
})