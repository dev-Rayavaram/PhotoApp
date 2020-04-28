import React ,{Component} from 'react'
import firebase from '../config/fireauth'
/*
create class component User
    initialize state
    bind getUsers method
implement getUsers and lifecycle methods componentDidMount,render
    procedure componentDidMount
        invoke getUsers
    procedure getUsers
        get current user from firebase
         IF user exists
            set currentUser state with data from firebase(currently we are not using that data in this page)
            get root reference for firebase database("users directory")
            call once on firebase root reference(once will get total snapshot)
            get child nodes by using forEach on snapshot(firebase database stores data in tree structure)
            get value on each child node 
            set localUsers array with each value
        ELSE
            redirect to Bookmarks as page refresh on Users returns blank page
    procedure render
        IF user data is loaded and user data is not empty
            render data
export  Users

*/

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
                  //  console.log("this.setState",this.state)
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
              //  console.log("data inside getUsers",this.state.localUsers)        
    }
  
     componentDidMount(){
        this.getUsers();
     //  console.log("results in componentDidMount")
      // console.log(results)
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