import React ,{Component} from 'react'
import ProTypes from 'prop-types'
import Btn from './component/button'
class ThemeSwitch extends Component{
    static contextTypes={
        store:ProTypes.object
    }
    constructor(){
        super()
        this.state={
            themeColor:''
        }
    }
    componentWillMount(){
        const {store}=this.context
        this._updateThemeColor()
        store.subscribe(()=>this._updateThemeColor())
    }
    _updateThemeColor(){
        const {store}=this.context
        const state=store.getState()
        this.setState({themeColor:state.themeColor})
    }
    handelSwitchColor(color){
        const {store} =this.context
        store.dispatch({
            type:'CHANGE_COLOR',
            themeColor:color
        })
        console.log(store.getState())//点击会看到state随着传入的color更新
    }
    render(){
        return(
            <div>
                <Btn value='按钮1'></Btn>
                <button style={{color:this.state.themeColor}} onClick={this.handelSwitchColor.bind(this,'red')}>Red</button>
                <button style={{color:this.state.themeColor}} onClick={this.handelSwitchColor.bind(this,'blue')}>Blue</button>
            </div>
        )
    }
}
export default ThemeSwitch