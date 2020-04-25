import React ,{Component} from 'react'


class Bookmarks extends Component{
    render(){
        if(this.props && this.props.images && this.props.images !== undefined){
            return (
                <div className="main">
                   <div className="container">
                   <>
                       <h3>Your uploaded pictures are</h3>
                       </>
                   <div className="sub-container-2">

                            {
                                this.props.images.map((image,index)=>{return(
                                    <React.Fragment>
                                        <>
                                        <caption>Likes:{image.liked}</caption>
    
                                            <img src={image.image} alt="main" style={{width:"250px",height:"250px"}} ></img>
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