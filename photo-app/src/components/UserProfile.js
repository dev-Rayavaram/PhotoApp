import React ,{Component} from 'react'
import firebase from '../config/fireauth'
import defaultImage from '../images/default.jpeg'
import { Button } from 'react-bootstrap';
/*
create class component UserProfile
    initialize user data
    bind getProfile,updateProfile,handleNameChange and handleEmailChange methods to class
    implement Lifecycle methods componentDidMount,render
    Procedure componentDidMount
        invoke getUserProfile
        IF state from props is not NULL and props state has images array
            map through the array and set images state
                set state to state to force re-render the page
    procedure getUserProfile
        get current user from firebase auth
            IF user exists
                set state
            ELSE
                redirect to Bookmarks as refresh page gets null user data from firebase
    procedure handleNameChange
        get event target value
            set user state with new value for name by keeping existing values for other fields
     procedure handleEmailChange
        get event target value
            set user state with new value for email by keeping existing values for other fields
            
*/
class UserProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            file:'',
            url:'',
            user:{
                displayName:'',
                email:'',
                photoURL:defaultImage
            },
            likedList:[],
            isLoaded:false 
        }
        this.getProfile = this.getProfile.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)

    }     
 
    async componentDidMount(){
        await this.getProfile();
         if(this.props.location.state && this.props.location.state.images){ 
            this.props.location.state.images.sort((a,b)=>(a.liked<b.liked)?1:-1)
            this.props.location.state.images.map((item)=>this.state.likedList.push(item))
            this.setState({ state: this.state });
        }
    }

    handleNameChange(event){
        event.preventDefault();
      //  console.log(this.state)
        this.setState({user:{displayName:event.target.value,email:this.state.user.email,photoURL:this.state.user.photoURL,uid:this.state.user.uid} });
      }
      handleEmailChange(event){
        this.setState({user:{displayName:this.state.user.displayName,email:event.target.value,photoURL:this.state.user.photoURL,uid:this.state.user.uid}});
        event.preventDefault();
      }
     async getProfile(){
        const user = await firebase.auth().currentUser;

        if (user != null) {

            this.setState({user:{displayName:user.displayName,email:user.email,photoURL:user.photoURL,uid:user.uid} })
            this.setState({isLoaded:true})         
        }
        else{
            this.props.history.push('/Bookmarks')
        }
    }
     updateProfile(e){
        e.preventDefault();
        var user = firebase.auth().currentUser;
       // console.log("inside updateProfile")
        user.updateProfile({
        displayName: this.state.user.displayName,
        }).then(function() {
            alert("profile updated")
          }).catch(function(error) {
            console.log(error)
          });
    }
    render(){
     //   console.log("this.state.likedList",this.state.likedList)
         if(this.state.isLoaded===true && this.state.user!==null && this.state.user!== undefined){
            let imageUrl =(this.state.user.photoURL===null)?defaultImage:this.state.user.photoURL;
          //  console.log("this.state.images is ",this.state.images)
            return (
                    <div className="main">
                        <h1>User Profile</h1>
                        <div className="image">
                            <img src={imageUrl} alt="profile" width="150px" height="150px"></img>
                        </div>
                       <div className="container">
                            <div className="sub-container-1">
                                    <form>
                                        <h5 hidden>UID :{(this.state.user.uid)?this.state.user.uid:'0'}</h5>
                                        <div className="col-8">
                                            <label className="label">Name:</label>
                                            <input className="input" type="text" value={this.state.user.displayName}   name="displayName"
                                            id="Name" onChange = {this.handleNameChange} />
                                        </div>
                                        <div className="col-8">
                                            <label>Email:</label>
                                            <input className="input" type="email" value={this.state.user.email} name="email" id="email" onChange = {this.handleEmailChange}  />
                                        </div>
                                        <div className="col-8">
                                            <Button variant="primary" onClick={this.updateProfile}>Update Profile</Button>
                                        </div>
                                    </form>
                                    <div className="box">
                                    {
                                        this.state.likedList?(
                                            this.state.likedList.map((image,index)=>(
                                                <div className="image">
                                                <img src={image.image} alt="profile" width="200px" height="200px"></img>
                                                </div>

                                            ) 
                                        )):<></>
                                    }
                                    </div>
                            </div>
                       </div>
                </div>
            )

        }
        else{
            return (
                <div className="main">
                
                 </div>
            )            
        }
    }
 
}
export default UserProfile;