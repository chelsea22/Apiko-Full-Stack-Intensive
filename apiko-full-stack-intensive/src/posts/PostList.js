import React from 'react';
import data from '../data.json';
import PostSearch from './PostSearch';
import PostListItem from './PostListItem';
import MoreButton from './MoreButton';
import NoItemsMessage from './NoItemsMessage';
import styled from 'styled-components';

const posts = data;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const PostsListContainer = styled.div`
  max-height: 75vh;
  overflow-y: scroll;
`

class PostList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      endOfList: 10,
      list: posts,
      searchValue: '',
    }
  }
  handleMoreClick = () => {
    this.setState(prevState => ({ endOfList: prevState.endOfList + 10 }));
    this.container.scrollBy(0, this.container.clientHeight);
  }
  handleSearch = (text) => {
    this.setState({ searchValue: text });
  }
  render () {
    const { searchValue, list, endOfList } = this.state;
    const filteredList = list.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    return(
      <PostsContainer>
        <PostSearch value={searchValue} onSearch={this.handleSearch} />
        {filteredList.length > 0
          ? <PostsListContainer innerRef={ref => this.container = ref }>
            {filteredList.slice(0, endOfList).map(post => <PostListItem key={post.id} post={post} />)}
          </PostsListContainer>
          : <NoItemsMessage />
        }
        {filteredList.length > 5 &&
          <MoreButton onClick={this.handleMoreClick}/>
        }
      </PostsContainer>
    );
  }
} 

export default PostList;
