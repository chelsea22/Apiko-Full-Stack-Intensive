import React, { Component } from 'react';
import './App.css';
import Posts from './posts/PostsContainer';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-logo">
          <a className="App-mh-logo" href="/">{""}</a>
        </div>
        <div className="App-wrapper">
          <ErrorBoundary>
            <Posts />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;
