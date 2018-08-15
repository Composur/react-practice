const router=require('express').Router();
router.get('/',(req,res,next)=>{
    console.log(req.cookies)
})
module.exports=router