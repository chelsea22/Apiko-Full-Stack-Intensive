import React from 'react';
import Message from '../components/Message';
import Button from '../components/Button';

const PostsLoadingErrorMessage = ({ onTryAgain }) => (
  <React.Fragment>
    <Message>Sorry, an error has occurred during posts load!</Message>
    <Button onClick={onTryAgain}>Try Again</Button>
  </React.Fragment>  
);

export default PostsLoadingErrorMessage;
