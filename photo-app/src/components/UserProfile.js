import React ,{Component} from 'react'
import firebase,{storage} from '../config/fireauth'

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
            isLoaded:false

        }
        this.downloadImages = this.downloadImages.bind(this)
        this.getProfile = this.getProfile.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)

    }
    componentDidMount(){
        console.log("inside component UserProfile didmount")
        this.getProfile()
        this.downloadImages();
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
        console.log("this.state.user is:", this.state.user)
    }
    updateProfile(e){
        e.preventDefault();
        var user = firebase.auth().currentUser;
        console.log("inside updateProfile")
        user.updateProfile({
        displayName: this.state.user.displayName,
        }).then(function() {
            console.log("upload successful")
          }).catch(function(error) {
            console.log(error)
          });
    }
    downloadImages(){
        console.log("inside download image")
        const storageRef = storage.ref();
        var starsRef = storageRef.child('images/connect4-red-image1.png');
        // Get the download URL
        starsRef.getDownloadURL().then((url) =>{
        // Insert url into an <img> tag to "download"
        console.log("url is",url)
        this.setState({url:url});
        console.log("this.state.url",this.state.url)
        }).catch(function(error) {
            console.log(error)
        switch (error.code) {
            case 'storage/object-not-found':
            // File doesn't exist
            break;
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
            case 'storage/canceled':
            // User canceled the upload
            break;
            case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
            default:
                break;
        }
});
    }
    render(){
        if(this.state.isLoaded===true){
            return (
                    <div className="main">
                        <h1>User Profile</h1>
                        <div className="image">
                            <img src={this.state.user.photoURL} alt="profile" width="150px" height="150px"></img>
                        </div>
                        <div className="container">
                         <form>
                            <h5>UID :{this.state.user.uid}</h5>

                            <div className="col-8">
                                <label className="label" for= "Name">Name:</label>
                                <input  type="text" value={this.state.user.displayName}   name="displayName"
                                id="Name" onChange = {this.handleNameChange} />
                            </div>
                            <div className="col-8">
                                <label for="email">Email:</label>
                                <input type="email" value={this.state.user.email} name="email" id="email" onChange = {this.handleEmailChange}  />
                            </div>
                            <div className="col-8">
                                <button onClick={this.updateProfile}>Update Profile</button>
                            </div>

                    </form>





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