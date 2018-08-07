import React ,{Component} from 'react'
import ProTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'
export default class Content extends Component{
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
    render(){
        return(
            <div>
                <p style={{color:this.state.themeColor}}>content</p>
                <ThemeSwitch/>
            </div>
        )
    }
}