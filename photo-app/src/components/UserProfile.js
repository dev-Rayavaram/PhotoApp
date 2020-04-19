import React ,{Component} from 'react'
import firebase,{storage} from '../config/fireauth'

class UserProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            file:'',
            url:'',
            user:[],
            isLoaded:false

        }
        this.downloadImages = this.downloadImages.bind(this)
        this.getProfile = this.getProfile.bind(this)

    }
    componentDidMount(){
        console.log("inside component UserProfile didmount")
        this.getProfile()
        this.downloadImages();
    }
    getProfile(){
        const user = firebase.auth().currentUser;
        if (user != null) {
            this.state.user.push({ displayName:user.displayName,email:user.email,photoURL:user.photoURL,uid:user.uid})
            this.setState({isLoaded:true})
        }
        console.log("this.state.user is:", this.state.user)
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
        if(this.state.isLoaded===true)
        return (
            <div className="main">
                <div className="image">
                    <img src={this.state.user.photoURL} width="150px" height="150px"></img>
                </div>
                <div className="profile">
                        <h5>Name :{this.state.user[0].displayName}</h5>
                        <h5>Email :{this.state.user[0].email}</h5>
                        <h5>UID :{this.state.user[0].uid}</h5>

                </div>
             </div>
        )
        else{
            return (
                <div className="main">
                
                 </div>
            )            
        }
    }
 
}
export default UserProfile;