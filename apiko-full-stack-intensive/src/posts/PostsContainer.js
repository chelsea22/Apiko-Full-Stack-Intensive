import React from 'react';
import PostList from './PostList';
import Spinner from '../components/Spinner';
import PostsLoadingErrorMessage from './PostsLoadingErrorMessage';

const postsEndpoint = 'https://jsonplaceholder.typicode.com/posts';

function validatePosts(posts) {
  return posts.filter(post => post.body && post.title && post.id);
}

class PostsContainer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loading: true,
      posts: [],
      showError: false,
    }
  }

  componentDidMount() {
    this.fetchPosts();
    this.fetchTimer = setInterval(this.fetchPosts, 10000);
  }
  
  componentWillUnmount() {
    clearInterval(this.fetchTimer);
  }

  fetchPosts = () => {
    fetch(postsEndpoint)
        .then(blob => blob.json())
        .then(data => validatePosts(data))
        .then(data => this.handleFetchSuccess(data))
        .catch(err => this.handleFetchError());
  }

  handleFetchSuccess = (data) => {
    this.setState({ posts: [ ...data ], loading: false });
  }

  handleFetchError = () => {
    this.setState({ loading: false, showError: true });
    clearInterval(this.fetchTimer);
  }

  handleTryAgain = () => {
    this.setState({ loading: true, showError: false });
    this.fetchPosts();
    this.fetchTimer = setInterval(this.fetchPosts, 10000);
  }

  render() {
    const { loading, showError, posts } = this.state;
    if (loading){
      return(
        <Spinner />
      );
    } else if (showError)  {
      return(
        <PostsLoadingErrorMessage onTryAgain={this.handleTryAgain} />
      );
    } else {
      return(
        <PostList posts={posts} />
      );
    }
  }
}

export default PostsContainer;
