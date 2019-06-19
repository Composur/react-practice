import { connect} from 'react-redux'


import Main from './main'

export default connect(state=>({loginUserInfo:state.loginUserInfo}))(Main)