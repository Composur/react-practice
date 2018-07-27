class Base{
    constructor(x,y){
        this.x=x
        this.y=y
    }
    log(){
        return console.log.bind(console)
    }
}
class test extends Base{
    constructor(){
        super()
        this.fn1=this.fn1.bind(this)
    }
    fn1(){
       console.log('fn1')
    }
    fn2(){
       return {
           fn:setTimeout(function(){
               this.fn1
           },1000)
       }
    }
}

const fn=new test()
fn.fn2()
