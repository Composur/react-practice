import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';

import Logo from '../../components/logo'
class Login extends Component {
    backClick(){
        alert('back')
    }
    render() {
        return (
            <div className='border'>
                <NavBar
                    onLeftClick={this.backClick.bind(this)}
                    mode="dark"
                    leftContent="返回"
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >智能CRM</NavBar>
                <Logo></Logo>
            </div>
        )
    }
}
export default Login