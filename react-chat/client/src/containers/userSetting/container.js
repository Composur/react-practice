import User from "./user";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
export default  connect(state=>{
    return{
        updateUserInfo:state.updateUserInfo,
        loginUserInfo:state.loginUserInfo
    }
   
}, {})(withRouter(User))