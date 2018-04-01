import React, { Component } from 'react';
import './App.css';
import PostList from './posts/PostList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-logo">
          <a className="App-mh-logo" href="/">{""}</a>
        </div>
        <div className="App-wrapper">
          <PostList />
        </div>
      </div>
    );
  }
}

export default App;
