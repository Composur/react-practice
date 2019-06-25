import React,{Component} from 'react'
import UserList from '../../components/user-list'
export default class PersonMain extends Component{
    componentDidMount(){
        this.props.userList({type:'normal'})
    }
    render() {
        const {payload=[]}=this.props.userListInfo
        return (
            <div>
               <UserList userListInfo={payload}></UserList>
            </div>
        );
    }
}
