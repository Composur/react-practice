import { connect } from 'react-redux';
import message from "./message";

export default connect(state=>({
  msgsList:state.msgsList,
  loginUserInfo:state.loginUserInfo
}),{})(message)