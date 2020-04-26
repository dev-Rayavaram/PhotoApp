import React ,{Component} from 'react'
import firebase from '../config/fireauth'
import defaultImage from '../images/default.jpeg'
import { Button } from 'react-bootstrap';

class UserProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            file:'',
            url:'',
            user:{
                displayName:'',
                email:''
            },
            topLikedPicture:'',
            isLoaded:false,
 
        }
        this.getProfile = this.getProfile.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)

    }
    componentDidMount(){
       // console.log("inside component UserProfile didmount")
        this.getProfile()
        if(this.props.location.state !==null && this.props.location.state!==undefined){
            this.setState({topLikedPicture:this.props.location.state.topLiked})
        }
       // console.log("this.state.topLikedPicture",this.state.topLikedPicture)
    }
    handleNameChange(event){
        this.setState({user:{displayName:event.target.value} });
      //  console.log("event",event);
        event.preventDefault();
      }
      handleEmailChange(event){
        this.setState({user:{email:event.target.value}});
      //  console.log("event",event);
        event.preventDefault();
      }
    getProfile(){
        const user = firebase.auth().currentUser;
        if (user != null) {
            this.setState({user:{displayName:user.displayName,email:user.email,photoURL:user.photoURL,uid:user.uid} })
            this.setState({isLoaded:true})
        }
       // console.log("this.state.user is:", this.state.user)
    }
    updateProfile(e){
        e.preventDefault();
        var user = firebase.auth().currentUser;
       // console.log("inside updateProfile")
        user.updateProfile({
        displayName: this.state.user.displayName,
        }).then(function() {
          //  console.log("upload successful")
          }).catch(function(error) {
            console.log(error)
          });
    }
    render(){
        if(this.state.isLoaded===true && this.state.user!==null && this.state.user!== undefined){
            let imageUrl =(this.state.user.photoURL===null)?defaultImage:this.state.user.photoURL;
          //  console.log("this.state.images is ",this.state.images)
            return (
                    <div className="main">
                        <h1>User Profile</h1>
                        <div className="image">
                            <img src={imageUrl} alt="profile" width="150px" height="150px"></img>
                        </div>
                        <h3>Your most liked picture is</h3>
                        <div className="image">
                            <img src={(this.state.topLikedPicture)?this.state.topLikedPicture:imageUrl} alt="profile" width="150px" height="150px"></img>
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
                            </div>
                      </div>
                      <div className="sub-container-2">
                                {
                                    this.props.images?(
                                    this.props.images.map((image,index)=>{return(
                                        <React.Fragment>
                                            <>
                                            <caption>Likes:{image.liked}</caption>

                                                <img src={image.image} alt="main" style={{width:"250px",height:"250px"}} ></img>
                                            </>
                                         </React.Fragment>
                                    )})):
                                    <React.Fragment>                                        
                                    </React.Fragment>
 
                                }
                                    
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