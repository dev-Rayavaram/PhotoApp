import React ,{Component } from 'react';
import fireauth from '../config/fireauth'


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
        // e.preventDefault();
        // fireauth.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(
        //     (u)=>{

        //     }
        // ).catch(e=>{
        //     console.log(e)
        // })
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        fireauth.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(
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
        <div className="page">
            <form>
                <div className="row">
                    <label>Email address:</label>
                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email"
                    id="EmailId" />
                </div>
                <div className="row">
                    <label>Password:</label>
                    <input value={this.state.password} onChange={this.handleChange} type="password" name="password"
                    id="PasswordId" />
                </div>
                <div className="row">
                    <button type="submit" onClick={this.handleSubmit}> Login</button>
                    <button  onClick={this.handleSignup}> Signup</button>
                </div>

            </form>
            <label></label>
        </div>
      );
    }
   
  }
  
  export default Login;