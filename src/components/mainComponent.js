import React, { Component } from 'react';
import Header from './headerComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component{

     render(){
         return(
             <div>
             <Header />
             </div>
              
         );
     }
}

export default  Main;