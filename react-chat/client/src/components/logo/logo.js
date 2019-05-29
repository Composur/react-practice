import React from 'react'
import logo from './image/haizhi.png'
import './logo.less'

export default function (){
    return(
        <div className='logo-container'>
            <img src={logo} alt='logo' className='logo'></img>
        </div>
    )
}