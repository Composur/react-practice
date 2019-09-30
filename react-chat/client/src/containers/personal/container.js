import {connect} from 'react-redux'
import Personal from './personal';

import {userUpdate} from '../../redux/actions'

export default connect(state=>(
    {updateUserInfo:state.loginUserInfo}
),{userUpdate})(Personal)