import { connect} from 'react-redux'
import {userInfo} from '../../redux/actions'

import Main from './main'

export default connect(state=>({loginUserInfo:state.loginUserInfo,updateUserInfo:state.updateUserInfo}),{userInfo})(Main)