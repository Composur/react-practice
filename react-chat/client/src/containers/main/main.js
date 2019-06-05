import React ,{Component}from 'react'

import {Switch,Route} from 'react-router-dom'

import Boss from '../boss/'

export default class Mian extends Component{
    render(){
        return(
            <div>
               <Switch>
                <Route path='/bossInfo' component={Boss}></Route>
               </Switch>
            </div>
        )
    }
}