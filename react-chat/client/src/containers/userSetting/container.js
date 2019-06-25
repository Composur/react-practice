import User from "./user";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {userInfo} from '../../redux/actions'
export default  connect(state=>{
    return{
        updateUserInfo:state.updateUserInfo,
        loginUserInfo:state.loginUserInfo
    }
    
}, {userInfo})(withRouter(User))