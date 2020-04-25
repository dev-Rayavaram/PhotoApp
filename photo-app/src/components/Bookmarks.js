import React ,{Component} from 'react'
// import image1 from '../images/1.png';
// import image2 from '../images/2.jpg';
// import image3 from '../images/3.png';
// import image4 from '../images/4.png';
// import image5 from '../images/5.png';
// import { Button } from 'react-bootstrap';

class Bookmarks extends Component{
    constructor(props){
        super(props);
            this.state={
              images:[],
                isLoaded:false 
               }
            }
            componentDidMount(){
                if(this.props.location.state!==null && this.props.location.state.images !==null && this.props.location.state.images!==undefined)
                    {
                        Object.values(this.props.location.state.images).map((item,index)=>
                           this.state.images.push(item)
                        )  
                        this.setState({isLoaded:true})
                    }
                console.log("inside componentDidMount ",this.state.images)
            }
    render(){
        if(this.state.isLoaded){
            return (
                <div className="main">
                   <div className="container">
                   <>
                       <h3>Your uploaded pictures are</h3>
                       </>
                   <div className="sub-container-2">

                            {
                                this.state.images.map((image,index)=>{return(
                                    <React.Fragment>
                                        <>
    
                                            <img  key={index} src={image.image} alt="main" style={{width:"250px",height:"250px"}} ></img>
                                            <div>
                                            <p key={index}>Likes:{image.liked}</p>                                        
                                            <button style={{width:"40px" ,height:"40px"}} key={index} variant="primary" onClick={this.handleLike}>Like</button>

                                            </div>
                                        </>
                                        </React.Fragment>
                                )})
                            }
                        </div>
                   </div>
                 </div>
            )

        }
        else{
            return(
                    <div className="main">
                        <div className="container">
                        <div className="sub-container-2">
                         </div>
                    </div>
                 </div>

            )
        }
    }
 
}
export default Bookmarks;