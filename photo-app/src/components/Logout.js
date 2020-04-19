import React ,{Component} from 'react'
import firebase from '../config/fireauth'

class Logout extends Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }
    render(){
        return (
            <div className="page">
                        <button  onClick={this.logout}> Logout</button>
             </div>
        )
    }
 
}
export default Logout;