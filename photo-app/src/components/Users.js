import React ,{Component} from 'react'
import firebase from '../config/fireauth'


class Users extends Component{
    constructor(props){
        super(props)
        this.state={
            currentUser:[],
            localUsers:[],
            isLoaded:false
        }
        this.getUsers = this.getUsers.bind(this)

    }
     async getUsers(){
                const user =  firebase.auth().currentUser;
                if (user != null) {
                    console.log("this.setState",this.state)
                    this.setState({currentUser:{displayName:user.displayName,email:user.email,photoURL:user.photoURL,uid:user.uid} })
                    await firebase.database().ref('/users/').once('value').then((snapshot)=> {
                            snapshot.forEach((childSnapshot)=> {
                                let value = childSnapshot.val()
                               this.state.localUsers.push(value)
                            });
                    });
                    this.setState({isLoaded:true})

                 }

                else{
                    this.props.history.push('/Bookmarks')
                }
                console.log("data inside getUsers",this.state.localUsers)        
    }
  
     componentDidMount(){
       const results=  this.getUsers();
       console.log("results in componentDidMount")
       console.log(results)
    }
   render(){
            if(this.state.isLoaded && this.state.localUsers){
                    return (
                            <div className="main">
                                <div className="sub-main-2">
                                    <div className="container">                        
                                    <ul>
                                        <>
                                        {
                                            this.state.localUsers.map((item,index)=>
                                                <li key={index}>
                                                    <p>User :{index} Email:{item.email}</p>
                                                </li>
                                        )}  
                                        </>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                            
                    );  
            
            }
            else{
                    return (
                        <React.Fragment>
                        </React.Fragment>
            
                    );
                } 
            }
        


}
export default Users;