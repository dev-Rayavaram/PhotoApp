import React, {Component} from 'react';
import './App.scss';
import fireauth from './config/fireauth'
import Login from './components/Login'
import Home from './components/Home'
import Bookmarks from './components/Bookmarks'
import UserProfile from './components/UserProfile'
import Logout from './components/Logout'

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
    fireauth.auth().onAuthStateChanged((user)=>{
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
        <header className="App-header">
          {this.state.user ? 
          (
                <Router>  
                <div >
                  <nav>
                      <ul>
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
                      <Route exact path="/Logout" component={Logout}>          
                      </Route>             
                  </Switch>
                </div>
                </Router>            
          ):(<Login/>)}
         </header>
      </div>
    );
  }
 
}

export default App;
