import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import FastClick from 'fastclick'
import { Button } from 'antd-mobile';
import './index.less'
FastClick.attach(document.body); //解决点击延迟300ms 



ReactDOM.render(<div ><Button type='primary'  inline size="small">btn</Button></div>, document.getElementById('root'));
serviceWorker.unregister();
