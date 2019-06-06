import React ,{Component}from 'react'

import {Switch,Route} from 'react-router-dom'

import Boss from '../boss/'
import Personal from '../personal';

export default class Mian extends Component{
    render(){
        return(
            <div>
               <Switch> {/* 等于说是main路由下的路由 */}
                <Route path='/bossInfo' component={Boss}></Route>
                <Route path='/personInfo' component={Personal}></Route>
               </Switch>
            </div>
        )
    }
}