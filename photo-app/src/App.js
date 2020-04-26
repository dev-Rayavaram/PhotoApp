import React, {Component} from 'react';
import './App.scss';
import firebase  from './config/fireauth';
import Login from './components/Login'
import Bookmarks from './components/Bookmarks'
import UserProfile from './components/UserProfile'
import UploadFile from './components/upload'
import Logout from './components/Logout'
import Footer from './components/Footer.js'
import Header from './components/Header.js'
import image1 from './images/1.png';
import image2 from './images/2.jpg';
import image3 from './images/3.png';
import image4 from './images/4.png';
import image5 from './images/5.png';

import {Route,Switch,Link,BrowserRouter as Router} from 'react-router-dom'


class  App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{},
      images:[
        {   id:1,
            image:image1,
            liked:0
        },
        {   id:2,
            image:image2,
            liked:0

        },
        {     id:3,
             image:image3,
             liked:0

        },
        {   id:4,
             image:image4,
             liked:0
        },
        {   id:5,
            image:image5,
            liked:0
        }],
        topLiked:'' 
    }
    this.handle=this.handle.bind(this)
    this.handleTopRanked = this.handleTopRanked.bind(this)
  }
  componentDidMount(){
    this.authListener()
  }
  handleTopRanked(){
      let max=0;
      let maxId =0
      for(let image of this.state.images){
          if(image.liked>max){
            maxId = image.id
            max=image.liked
          }
          else{
          }
      }
      let topImageIndex = this.state.images.findIndex(x=> x.id === maxId);
      if(topImageIndex>=0){
          let topImage = this.state.images[topImageIndex]
          this.setState({topLiked:topImage.image})
  
      }
    }
  //calling method in setState is to handle async setState results
  //https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/
  //handle for like unlike by comparing input2, 
  //if input2 is 1 handle like else if it is 2 handle unlike
  //input is id input2 is method type
  //fixed setting state of an array element by following instructions from stackoverflow
//https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate

  handle=(index,input2)=>{
    //console.log("handle before change",this.state.images)

      let value;
     if(input2===1){
       console.log("index is ",index)
       console.log("this.state ",this.state)

      value= this.state.images[index].liked+1;
     }
     else if(input2===2){
      value= this.state.images[index].liked-1;
      value=(value<0)?0:value
     }
      let newObject= {id:this.state.images[index].id,image:this.state.images[index].image,liked:value}
      this.setState({
          images: [
          ...this.state.images.slice(0,index),newObject,
          ...this.state.images.slice(index+1)
          ]
      },()=>{this.handleTopRanked()}); 
    //  console.log("handle changes",this.state.images)
     }
  
  authListener(){
    firebase.auth().onAuthStateChanged((user)=>{
      console.log(user);
      if(user){
        this.setState({user});
        localStorage.setItem('user',user.uid)
      }
      else{
        this.setState({user:null});
        localStorage.removeItem('user',user.uid)
      }
    })
  }
  render(){
    return (
      <div className="App">
        <div className="header">
          <Header/>
        </div>
      <div className="body">
          {this.state.user ? 
          (
                <Router>  
                <div className="main">
                  <nav> 
                      <ul className="menu">
                      <li>
                        <Link to={{ pathname: '/', state:{topLiked:this.state.topLiked }} }>User Profile </Link>
                      </li>
                       <li>
                        <Link  to={{ pathname: '/Bookmarks', state:{images:this.state.images },props:{prop:this.handle} }} >Bookmarks</Link>
                      </li>
                      <li>
                        <Link to="/Upload" >Upload Picture</Link>
                      </li>
                      <li>
                        <Link to="/Logout" >Logout</Link>
                      </li>
                      </ul>
                  </nav>
                  <Switch>
                       <Route exact path="/" component={UserProfile}>          
                      </Route> 
                      <Route exact path = "/Bookmarks" component= {() => <Bookmarks handle={this.handle} state={this.state.images }/>}>
                      </Route>
                      <Route exact path="/Upload" component={UploadFile}>          
                      </Route>             
                      <Route exact path="/Logout" component={Logout}>          
                      </Route>             
                  </Switch>
                </div>
                </Router>            
          ):(
            <div className="body">
              <div className="main">

              <Login/>
              </div>
            </div>
          )}
      </div>
      <div className="footer">
          <Footer/>
        </div>
      </div>

    );
  }
 
}

export default App;
