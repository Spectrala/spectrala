import React, {Component} from 'react';
import './App.css';
import { Switch, Route, useLocation } from "react-router-dom";
import Dashboard from "./dashboard/dashboard.js";

export default class App extends Component {
  render() {
    return (
        <Dashboard/> 
    );
  }
  
}




/**

<div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div> 

*/