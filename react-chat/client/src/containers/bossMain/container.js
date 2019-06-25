import {connect} from 'react-redux'
import BossMain from './boss_main'
import {userList} from '../../redux/actions'
export default connect(state=>({
    userListInfo:state.userListInfo,
}),{userList})(BossMain)