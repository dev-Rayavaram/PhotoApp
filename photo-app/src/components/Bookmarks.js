import React ,{Component} from 'react'

/*
    pseudocode
    create stateful component Bookmarks for displaying pictures
        initialize state
        bind methods to this
        implement lifecycle method componentDidMount
            inside componentDidMount 
                IF state from props is NOT NULL
                    set state for image objects
                    set isLoaded state to true
        implement lifecycle method render
            inside render
                IF state exists and isLoaded is true
                    display images in a grid
                    create buttons Like and UnLike
                    trigger events to parent component on button click (handle is the parent method)
        implement event handlers for Like and unLike buttons
            inside button handlers
                get event.target.value
                trigger event to parent component
        export Bookmarks
    */
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
        let idStr = e.target.value
        let id = parseInt(idStr);
        var index = this.state.images.findIndex(x=> x.id === id);
          this.props.handle(index,2);
    }
    handleLike(e){
        e.preventDefault();
        let idStr = e.target.value
        let id = parseInt(idStr);
        var index = this.state.images.findIndex(x=> x.id === id);
         this.props.handle(index,1);
    }
    componentDidMount(){
      //  console.log("this.props componentDidMount Bookmarks")
       // console.log(this.props)
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
                                                <div className="buttons">
                                                    <p >Likes:{image.liked}</p>                                        
                                                    <button className="fa fa-thumbs-up" style={{width:"40px" ,height:"40px"}} variant="primary" value={image.id} onClick={this.handleLike}>I </button>
                                                    <button className="fa fa-thumbs-down" style={{width:"40px" ,height:"40px"}}  variant="primary" value={image.id} onClick={this.handleUnLike}>I </button>
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