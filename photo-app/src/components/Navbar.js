import React,{Component} from 'react';
import {Route,Switch,Link,BrowserRouter as Router} from 'react-router-dom'


export default class Navbar extends Component
    {
      constructor(props){
        super(props);
        this.state={
          value:'News',
          style:{
                  'textDecoration':'none',
                  backgroundColor:'#005689',
                  color:'white',
                  border:'white',
                  'fontFamily':'Jacques Francois',
                  'fontSize': '30px'
          }
        }
        // this.onMouseOver =  this.onMouseOver.bind(this);
        // this.onMouseClick= this.onMouseClick.bind(this);          

      }
      onMouseOver=(event)=>{
        console.log(this.state.style.backgroundColor)
      }
      onMouseClick=(category)=>{
        if(category === 'News'){
          this.setState({value:'News'});
          this.props.onLinkClicked('News');

        }
        else if(category === 'Opinion'){
          // this.setState({style:{border:'orange'}});
          this.setState({value:'Opinion'});
          this.props.onLinkClicked('Opinion');

        }
        else if(category === 'Sport'){
          this.setState({value:'Sport'})
          this.props.onLinkClicked('Sport');
          
        }
        else if(category === 'Culture'){
          this.setState({value:'Culture'})
          this.props.onLinkClicked('Culture');
          
        }
        else if(category === 'LifeStyle'){
          this.setState({value:'LifeStyle'});
          this.props.onLinkClicked('LifeStyle');     
        } 
 
      }

      render(){
        return (
 
          <Router>  
          <div>
            <nav>
                <ul>
                  <li>
                  <Link to="/News"  style={this.state.style} onClick={()=>this.onMouseClick('News')} >News</Link>
                </li>
                <li>
                  <Link to="#"  style={this.state.style} onClick={()=>this.onMouseClick('Opinion')}>Opinion</Link>
                </li>
                <li>
                  <Link to="#"  style={this.state.style} onClick={()=>this.onMouseClick('Sport')}>Sport</Link>
                </li>
                <li>
                  <Link to="#"  style={this.state.style} onClick={()=>this.onMouseClick('Culture')}>Culture</Link>
                </li>
                <li>
                  <Link to="#"  style={this.state.style} onClick={()=>this.onMouseClick('LifeStyle')}>LifeStyle</Link>
                </li> 
              </ul>
            </nav>
            <Switch>
                <Route exact path="/News" component={News}>          
                </Route>
                <Route exact path="/Opinion" component={Opinion}>          
                </Route>
                <Route exact path="/Sport" component={Sport}>          
                </Route>
                <Route exact path="/Culture" component={Culture}>          
                </Route>
                <Route exact path="/LifeStyle" component={LifeStyle}>          
                </Route>

            </Switch>
           </div>
         </Router>
            );
      }
        
    } 

      class News extends Component {
         render(){
          return(
            <div>
              <span></span>
        
            </div>

          );
        }
 }

          class Opinion extends Component {
            render(){
              return(
                <span></span>

              );
            

            }
     }
          class Sport extends Component {
            render(){
              return(
                <span></span>

              );
            }
     }
            class Culture extends Component {
              render(){
                return(
                  <span> </span>

                );
              
  
              }
       }
            class LifeStyle extends Component {
              render(){
                return(
                  <span> </span>

                )
              
  
              }
       }