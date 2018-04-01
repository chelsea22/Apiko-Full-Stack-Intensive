import React from 'react';
import styled from 'styled-components';

const PostContainer = styled.div`
  border: 2px solid #ada3a3;
  border-radius: 20px;
  box-shadow: 0px 3px 6px 0px #ff9900;
  margin: 1rem;
  padding: .7rem .5rem;
  font-size: .85rem;
`
const NumberSpan = styled.span`
  float: right;
  margin: 0 .5rem 0 0;
`
const PostHeader = styled.h2`
  text-align: center;
  font-style: oblique;
  text-decoration: none;
`
const PostBody = styled.p`
  text-indent: 1rem;
`

const Post = ({ post }) => {
  return(
    <PostContainer>
      <NumberSpan>{post.id}.</NumberSpan>
      <PostHeader>{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</PostHeader>
      <PostBody>{post.body.charAt(0).toUpperCase() + post.body.slice(1)}</PostBody>
    </PostContainer>
  );
}

export default Post;
