import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store'
import logo from './assets/logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
     <Provider store={store}>

     </Provider>
    );
  }
}

export default App;
