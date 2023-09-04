import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker'
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import HeaderApp from './components/HeaderApp';
import 'bootstrap/dist/css/bootstrap.css'


 
ReactDOM.render(<HeaderApp />, document.getElementById('header'));
ReactDOM.render(<HashRouter>
  <div>
    <Route exact path="/" component={Signin} />
    <Route path="/signup" component={Signup} />
    <Route path="/home" component={Home} />
  </div>
</HashRouter>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
