import React ,{Component} from 'react'

class Greeter extends Component{
    render(){
        return(
            <div>
                <span>Hello 小七!</span>
            </div>
        )
    }
}
export default Greeter


// es5的语法
// module.exports=function(){
//     var greet=document.createElement('div')
//     greet.textContent='这是要暴露出来的div的content'
//     return greet
// }