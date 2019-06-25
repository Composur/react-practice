import PersonMain from "./personalMain";
import { connect } from 'react-redux';
import {userList} from '../../redux/actions'
export default  connect(state=>({
    userListInfo:state.userListInfo,
}),{userList})(PersonMain)