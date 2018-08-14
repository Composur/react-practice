import React ,{Component} from 'react'

export default class  Cart extends Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='card'>
                <div className='card-Content'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}