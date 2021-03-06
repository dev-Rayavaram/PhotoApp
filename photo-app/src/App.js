import React, {Component} from 'react';
import './App.scss';
import firebase  from './config/fireauth';
import Login from './components/Login'
import Bookmarks from './components/Bookmarks'
import UserProfile from './components/UserProfile'
import UploadFile from './components/upload'
import Users from './components/Users'
import Logout from './components/Logout'
import Footer from './components/Footer.js'
import Header from './components/Header.js'
import image1 from './images/1.png';
import image2 from './images/2.jpg';
import image3 from './images/3.png';
import image4 from './images/4.png';
import image5 from './images/5.png';

import {Route,Switch,Link,BrowserRouter as Router} from 'react-router-dom'
/*
  App.js uses firebase authentication ,and congig.js has required configuration for configuration
    pseudocode for the config.js
      initialize firebase using required keys ,appId, auth domain for firebase authentication
      initialize storage bucket location for firebase storage service
      initialize database url for firebase as a database service 
      export firebase

    pseudocode for App.js

  create App as a stateful component
    initialize user, images topLiked variables
    bind handle,handleTopRanked methods to this
    implement lifecycle method componentDidMount
        inside componentDidMount
        call authListener
    in authListener IF authenticated set state for user
    implement lifecycle method render
      procedure render
        IF user exists
          render child components using routing by sending state as props
        ELSE
          redirect to login page  
          
    implementation for handle a button handler for child component(these medthods allow multiple clicks 
        as current data is not persistent across multiple login accounts)
          procedure handle
              IF input equals 1 
                  increase like by 1, and set liked for corresponding image object
              ELSE input equals 2
                  decrease like by 1, and change liked value for that image object
          END procedure                    
*/

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
    }
    this.handle=this.handle.bind(this)
  }
  componentDidMount(){
    this.authListener()
  }
  //the following code was used to deal with sorting arrays based on value in object
  //https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  //handle for like unlike by comparing input2, 
  //if input2 is 1 handle like else if it is 2 handle unlike
  //input is id input2 is method type
  //fixed setting state of an array element by following instructions from stackoverflow

   handle=(index,input2)=>{
    //console.log("handle before change",this.state.images)

      let value;
     if(input2===1){
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
      },
      )
     }
     
  authListener(){
    firebase.auth().onAuthStateChanged((user)=>{
      //console.log(user);
      if(user){
        this.setState({user});
        localStorage.setItem('user-data',user)
      }
      else{
        this.setState({user:null});
        localStorage.removeItem('user-data',user)
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
                        <Link to={{ pathname: '/', state:{images:this.state.images }} }>User Profile </Link>
                      </li>
                       <li>
                        <Link  to={{ pathname: '/Bookmarks', state:{images:this.state.images },props:{prop:this.handle} }} >Bookmarks</Link>
                      </li>
                      <li>
                        <Link to="/Upload" >Upload Picture</Link>
                      </li>
                      <li>
                        <Link to="/Users" >Users</Link>
                      </li>

                      <li>
                        <Link to="/Logout" >Logout</Link>
                      </li>
                      </ul>
                  </nav>
                  <Switch>
                      <Route exact path="/" component= {UserProfile}> 
                      </Route> 
                       <Route exact path = "/Bookmarks" component= {() => <Bookmarks handle={this.handle} state={this.state.images }/>}>
                      </Route>
                      <Route exact path="/Upload" component={UploadFile}>          
                      </Route> 
                      <Route exact path="/Users" component={Users}>          
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
