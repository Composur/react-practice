import { connect } from 'react-redux';

import {login} from '../../redux/actions'

import Login from './login'

export default connect(state=>({loginUserInfo:state.loginUserInfo}),{login})(Login)