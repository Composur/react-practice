import React ,{Component} from 'react'

export default class Clock extends Component{
    constructor(){
        super();
        this.state={
            data:new Date()
        }
    }
    componentWillMount(){
      this.time=setInterval(()=>{
           this.setState({
               data:new Date()
           })
       },1000)
    }
    componentDidMount(){
    }
    componentWillUnmount(){
        clearInterval(this.time)
        console.log('WillUnmount')
    }
    render() {
        return(
            <div>
                <h2>
                    <p>现在的时间是</p>
                    {this.state.data.toLocaleTimeString()}
                </h2>
            </div>
        )
    }
    
}