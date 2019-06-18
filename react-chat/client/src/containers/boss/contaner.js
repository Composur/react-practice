import {connect} from 'react-redux'

import {boss} from '../../redux/actions'

import Boss from './boss-info'

export default connect(state=>({bossInfo:state.bossInfo}),{boss})(Boss)

