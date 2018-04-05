import React from 'react';
import Message from './Message';

class ErrorBoundary extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hasError: false,
    };
  }
  componentDidCatch(error, info){
    this.setState({ hasError: true });
    console.error(error, info);
  }
  render(){
    if (this.state.hasError) {
      return <Message>Sorry, an error has occurred!</Message>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
