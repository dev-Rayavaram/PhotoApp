import React ,{Component} from 'react'
import fireauth from '../config/fireauth'

class Home extends Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        fireauth.auth().signOut().then(function() {
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
export default Home;