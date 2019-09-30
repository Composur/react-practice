import {connect} from 'react-redux'

import {userUpdate} from '../../redux/actions'

import Boss from './boss-info'

export default connect(state=>({updateUserInfo:state.loginUserInfo}),{userUpdate})(Boss)

