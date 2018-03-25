// var div=require('./greeter')
// console.log(div())
// document.querySelector('#root').appendChild(div())

console.log('用es5语法')
import React from 'react'
import ReactDom from 'react-dom'
import Greeter from './greeter'
import './main.css'
return(
    <Greeter/>,
    document.querySelector('#root')
)