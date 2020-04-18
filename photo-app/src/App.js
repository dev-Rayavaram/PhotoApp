import React, {Component} from 'react';
import './App.css';
import fireauth from './config/fireauth'
import Login from './components/Login'
import Home from './components/Home'

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
          {this.state.user ? (<Home/>):(<Login/>)}
         </header>
      </div>
    );
  }
 
}

export default App;
