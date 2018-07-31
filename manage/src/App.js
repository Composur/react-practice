import React, { Component } from 'react';
import BasicLayout from './layout/BasicLayout'
import Comment from './components/comment/CommentApp'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Comment/>
      </div>
    );
  }
}

export default App;
