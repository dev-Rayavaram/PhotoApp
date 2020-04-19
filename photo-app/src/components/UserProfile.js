import React ,{Component} from 'react'
import {storage} from '../config/fireauth'

class UserProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            file:'',
            url:''
        }
        this.downloadImages = this.downloadImages.bind(this)

    }
    componentDidMount(){
        console.log("inside component didmount")
        this.downloadImages();
    }
    downloadImages(){
        console.log("inside component didmount")
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
        }
});
    }
    render(){
        return (
            <div className="main">
                       Home
             </div>
        )
    }
 
}
export default UserProfile;