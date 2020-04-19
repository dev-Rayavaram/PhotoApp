import React, {Component} from 'react';
import './App.scss';
import firebase  from './config/fireauth';
import Login from './components/Login'
import Home from './components/Home'
import Bookmarks from './components/Bookmarks'
import UserProfile from './components/UserProfile'
import UploadFile from './components/upload'

import Logout from './components/Logout'
import Footer from './components/Footer.js'
import Header from './components/Header.js'


import {Route,Switch,Link,BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios';


class  App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{}
    }
  }
  componentDidMount(){
    this.authListener()
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
                        <Link to="/" >Home</Link>
                      </li>
                      <li>
                        <Link to="/UserProfile">User Profile</Link>
                      </li>
                      <li>
                        <Link to="/Bookmarks">Bookmarks</Link>
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
                       <Route exact path="/" component={Home}>          
                      </Route> 
                      <Route exact path="/UserProfile" component={UserProfile}>          
                      </Route> 
                      <Route exact path="/Bookmarks" component={Bookmarks}>          
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
