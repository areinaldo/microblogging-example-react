import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker'
import Sigin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import HeaderApp from './components/HeaderApp';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter, Route } from 'react-router-dom';

/* 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
No se si hay que borrar

*/ 
ReactDOM.render(<HeaderApp />, document.getElementById("header"));
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
reportWebVitals();
