import React ,{Component } from 'react';
import firebase from '../config/fireauth'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const database = firebase.database();

class  Login extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSignup = this.handleSignup.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }
    handleSignup(e){
         e.preventDefault();
         firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(
             (u)=>{
                    console.log(u)
                    console.log("u.uid",u.user.uid)

                     firebase.database().ref('/users/' + u.user.uid).set({
                       username: u.user.email,
                       email: u.user.email,
                       profile_picture : '',
                       displayName:''
                     });
             }
         ).catch(e=>{
             console.log(e)
         })
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(
            (u)=>{
                console.log("result",u)
                if(!("code" in u)== null){
                    console.log("inside if")
                }
            }
        ).catch(e=>{
            console.log(e)
            console.log("error",e)
            alert("User Not found !!! Please enter valid data or Signup");
           
        })

    }
    render(){
      return (
        <div className="container">
            <form>
                <div className="col-8">
                    <label className="label" for= "EmailId">Email:</label>
                    <input  className="input" value={this.state.email} onChange={this.handleChange} type="email" name="email"
                    id="EmailId" />
                </div>
                <div className="col-8">
                    <label for="PasswordId">Password:</label>
                    <input className="input"  value={this.state.password} onChange={this.handleChange} type="password" name="password"
                    id="PasswordId" />
                </div>
                <div className="col-8">
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}> Login</Button>
                    <Button variant="success" onClick={this.handleSignup}> Register</Button>
                </div>

            </form>
            <label></label>
        </div>
      );
    }
   
  }
  
  export default Login;