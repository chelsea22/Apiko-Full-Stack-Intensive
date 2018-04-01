import React from 'react';
import PostListItem from './PostListItem';
import Search from '../components/Search';
import Message from '../components/Message';
import Button from '../components/Button';
import styled from 'styled-components';

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
      list: this.props.posts,
      searchValue: '',
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ list: nextProps.posts });
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
        <Search value={searchValue} onSearch={this.handleSearch} />
        {filteredList.length > 0
          ? <PostsListContainer innerRef={ref => this.container = ref }>
            {filteredList.slice(0, endOfList).map(post => <PostListItem key={post.id} post={post} />)}
          </PostsListContainer>
          : <Message>No items found.</Message>
        }
        {filteredList.length > 5 &&
          <Button onClick={this.handleMoreClick}>More</Button>
        }
      </PostsContainer>
    );
  }
} 

export default PostList;
