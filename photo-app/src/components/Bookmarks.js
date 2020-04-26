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
            this.handleLike=this.handleLike.bind(this);
            this.handleUnLike=this.handleUnLike.bind(this);
    }
    handleUnLike(e){
        e.preventDefault();
        let id = e.target.value
        alert(e.target.value)
        //we have to use == because index is number and e.target.value is a string
        var index = this.state.images.findIndex(x=> x.id == id);
        let value = this.state.images[index].liked-1;
        console.log("value",value)
        //fixed setting state of an array element by following instructions from stackoverflow
        //https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
            if(index!==-1)
            {
                let newObject= {id:this.state.images[index].id,image:this.state.images[index].image,liked:value}
                console.log("sliced",this.state.images[index])
                this.setState({
                    images: [
                    ...this.state.images.slice(0,index),newObject,
                    ...this.state.images.slice(index+1)
                    ]
                }); 

        }
        console.log(this.state.images)
        this.props.handle(id,2);

    }
    handleLike(e){
        e.preventDefault();
        alert(e.target.value)
        let id = e.target.value
            //we have to use == because index is number and e.target.value is a string               
        var index = this.state.images.findIndex(x=> x.id == id);
        let value = this.state.images[index].liked+1;
        if (index !== -1){
                let newObject= {id:this.state.images[index].id,image:this.state.images[index].image,liked:value}
                this.setState({
                    images: [
                    ...this.state.images.slice(0,index),newObject,
                    ...this.state.images.slice(index+1)
                    ]
                });        
        }
        this.props.handle(id,1);
    }
    componentDidMount(){
        console.log("this.props componentDidMount Bookmarks")
        console.log(this.props)
        if(this.props.state!==null && this.props.state!==undefined)
            {
                Object.values(this.props.state).map((item,index)=>
                    this.state.images.push(item)
                )  
                this.setState({isLoaded:true})
            }
    }
    render(){
        if(this.state.isLoaded && this.state.images!==null &&this.state.images!== undefined){
            return (
                <div className="main">
                   <div className="container">
                   <>
                       <h3>Your uploaded pictures are</h3>
                       </>
                   <div className="sub-container-2">
                            {
                                this.state.images.map((image)=>{return(
                                    <React.Fragment>
                                        <ul>
                                            <li>
                                                <img  src={image.image} alt="main" style={{width:"250px",height:"250px"}} ></img>
                                                <div>
                                                    <p >Likes:{image.liked}</p>                                        
                                                    <button style={{width:"40px" ,height:"40px"}} variant="primary" value={image.id} onClick={this.handleLike}>Like</button>
                                                    <button style={{width:"40px" ,height:"40px"}}  variant="primary" value={image.id} onClick={this.handleUnLike}>UnLike</button>
                                                </div>

                                            </li>
                                         </ul>
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