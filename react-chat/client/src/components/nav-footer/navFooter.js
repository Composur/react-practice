import React, { Component } from 'react';
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types';
import './index.less'

const Item=TabBar.Item

export default class navFooter extends Component {
    static propTypes={
        navList:PropTypes.array.isRequired
    }
    render() {
        const {navList}=this.props
        const navListFilter=navList.filter((val)=>{
            return !val.hide
        })
        const path=this.props.location.pathname  //路由组件才有
        // 问题：非路由组件使用路由的API
        // 解决：使用withRouter包装后暴露出去
        // 这样会向组件中传入路由组件的属性 history location match
        return (
            <div>
                <TabBar>
                {
                    navListFilter.map((val)=>{
                      return(
                        <Item title={val.title} key={val.path} icon={{uri:require(`./images/${val.icon}.png`)}}
                         selectedIcon={{uri:require(`./images/${val.icon}-selected.png`)}} selected={val.path===path}
                         onPress={()=> this.props.history.replace(val.path)} 
                         
                         >
                        </Item>
                      ) 
                    })
                }
                </TabBar>
            </div>
        );
    }
}