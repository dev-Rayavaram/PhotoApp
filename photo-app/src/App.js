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
import image3 from './images/default.jpeg';
import image4 from './images/4.png';
import image5 from './images/5.png';

import {Route,Switch,Link,BrowserRouter as Router} from 'react-router-dom'


class  App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{},
      images:[
        {
            image:image1,
            liked:0
        },
        {
            image:image2,
            liked:0

        },
        {
             image:image3,
             liked:0

        },
        {
             image:image4,
             liked:0
        },
        {
            image:image5,
            liked:0

        }] 
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
                        <Link to="/" >User Profile</Link>
                      </li>
                      <li>
                        <Link to="/Users">Friends</Link>
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
                       <Route exact path="/" component={UserProfile}>          
                      </Route> 
                      <Route exact path="/Users" component={Users}>          
                      </Route> 
                      <Bookmarks images={this.state.images}> </Bookmarks>
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
