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
                email:'',
                photoURL:defaultImage
            },
            topLikedPicture:'',
            isLoaded:false 
        }
        this.getProfile = this.getProfile.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)

    }
    async componentDidMount(){
        console.log("inside component UserProfile didmount")
        await this.getProfile()
       // console.log("this.state.topLikedPicture",this.state.topLikedPicture)
    }

    handleNameChange(event){
        event.preventDefault();
        console.log(this.state)
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
            if(this.props.location.state !==null && this.props.location.state!==undefined){   
                this.setState({topLikedPicture:this.props.location.state.topLiked})
    
            }
            
        }
        else{
            this.props.history.push('/Bookmarks')
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