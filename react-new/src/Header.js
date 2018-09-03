import React, {Component} from 'react'
import ProTypes from 'prop-types'
import {connect} from './connect'
class Header extends Component {
    // static contextTypes = {
    //     store: ProTypes.object
    // }
    // constructor() {
    //     super()
    //     this.state = {
    //         themeColor: ''
    //     }
    // }
    // componentWillMount() {
    //     const {store}=this.context
    //     this._updateThemeColor()
    //     store.subscribe(()=>this._updateThemeColor())
    // }
    // _updateThemeColor() {
    //     const {store} = this.context
    //     const state = store.getState()
    //     this.setState({themeColor: state.themeColor})
    // }
    static propsTypes={
        themeColor:ProTypes.string
    }
    render() {
        return (
            <div>
                <h1 style={{color:this.props.themeColor}}>Header</h1>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        themeColor:state.themeColor
    }
}
Header=connect(mapStateToProps)(Header)
export default Header