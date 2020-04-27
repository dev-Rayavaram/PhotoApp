import React ,{Component} from 'react'
import firebase from '../config/fireauth'


class Users extends Component{
    constructor(props){
        super(props)
        this.state={
            users:[],
            currentUser:[],
            isLoaded:false
        }
        this.getUsers = this.getUsers.bind(this)

    }
     async getUsers(){
                const user = await firebase.auth().currentUser;
                if (user != null) {
                    const userId = user.uid;
                    this.setState({user:{displayName:user.displayName,email:user.email,photoURL:user.photoURL,uid:user.uid} })
                    this.setState({isLoaded:true})
                    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
                        console.log("data from the database")
                        const results = snapshot.val()
                        console.log(results)
                    });
        
                 }
                else{
                    this.props.history.push('/Bookmarks')
                }
    }
  
     componentDidMount(){
       const results=  this.getUsers();
       console.log("results in componentDidMount")
       console.log(results)
    }
   render(){
        return (
            <React.Fragment>
            </React.Fragment>
 
        );
      }
        


}
export default Users;