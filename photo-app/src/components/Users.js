import React ,{Component} from 'react'
import firebase from '../config/fireauth'

class Users extends Component{
    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
        this.getUsers = this.getUsers.bind(this)
    }
    getUsers()
    {
        
    }
    render(){
        return (
            <div className="page">
             </div>
        )
    }
 
}
export default Users;