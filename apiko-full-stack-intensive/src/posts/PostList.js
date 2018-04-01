import React from 'react';
import data from '../data.json';
import PostListItem from './PostListItem';
import MoreButton from './MoreButton';
import styled from 'styled-components';

const posts = data;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const PostsListContainer = styled.div`
  max-height: 78vh;
  overflow-y: scroll;
`

class PostList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      endOfList: 10,
      list: posts.map(post => <PostListItem key={post.id} post={post} />),
    }
  }
  handleMoreClick = () => {
    this.setState(prevState => ({ endOfList: prevState.endOfList + 10 }));
    this.container.scrollBy(0, this.container.clientHeight);
  }
  render () {
    return(
      <PostsContainer>
        <PostsListContainer innerRef={ref => this.container = ref }>
          { this.state.list.slice(0, this.state.endOfList) }
        </PostsListContainer>
        <MoreButton onClick={this.handleMoreClick}/>
      </PostsContainer>
    );
  }
} 

export default PostList;
