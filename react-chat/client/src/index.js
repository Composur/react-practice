import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import FastClick from 'fastclick'
import {HashRouter,Switch,Route} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './redux/store'

import Login from './containers/login'
import Register from './containers/register'
import Main from './containers/main'
import './assets/style/index.less'
FastClick.attach(document.body); //解决点击延迟300ms 



ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>  {/* 独立路由 */}
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route  component={Main}></Route>
            </Switch>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
