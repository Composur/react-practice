import React, {Component} from 'react';
import {render} from 'react-dom'
import {Router,Route,IndexRoute,Redirect,IndexLink} from 'react-router';
import {Link,BrowserRouter} from 'react-router-dom';
import {Button, Menu, Icon, Switch} from 'antd';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import './main.css';
import logoUrl from './assets/images/logo.png';



const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup; 

class App extends Component {
  state = {
    theme: 'light',
    current: '1'
  }
  handleClick = (e) => {
    console.log('click ', e);
  }
  render() {
    return (
      <div id="leftMenu">
        <img src={logoUrl} width="50" id="logo"/>
        <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
          <MenuItemGroup key="g1" title="Item 1">
            <Menu.Item key="1"><Link to='/myTable'>表格</Link></Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
      </div>
    );
  }
}
export default App;
