import React, {Component} from 'react'
import PropTypes from 'prop-types'

const mapStateToProps=(state)=>{
    return{
        themeColor:state.themeColor,
        themeName:state.themeName,
        fullName:`${state.firstName}${state.lastName}`
    }
}

export const  connect = (mapStateToProps) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }
        constructor() {
            super()
            this.state = {}
        }
        render() {
            const {store}=this.context
            let stateProps=mapStateToProps(store.getState())
            return (
                <div>
                    <WrappedComponent {...stateProps}/>
                </div>
            )
        }
    }
    return Connect
}
