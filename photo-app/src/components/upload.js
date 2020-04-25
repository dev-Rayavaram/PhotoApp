import React,{Component} from 'react'
import {storage} from '../config/fireauth'

class UploadFile extends Component{
    constructor(props){
        super(props)
        this.state={
            file:'',
            url:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }
    handleChange(e){
        this.setState({file:e.target.files[0]})
        console.log(this.state.file);

    }
    uploadImage(e){
        e.preventDefault();
        let image = this.state.file;
        var metadata = {
            contentType: 'image/jpeg'
          };
        const storageRef = storage.ref();
        var uploadResult = storageRef.child('images/' + image.name).put(image, metadata);
       if(uploadResult.state !==null && uploadResult.state ==="success")
            alert("File uploaded")
        else
        alert("uploading failed")

    }
    render(){
        return(
                <div className="main">
                    <div className="container">
                        <div className="sub-container-2">
                            <input type="file" onChange = {this.handleChange}></input>
                            <button onClick={this.uploadImage}>Upload</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default UploadFile;