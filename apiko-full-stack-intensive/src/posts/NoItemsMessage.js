import React from 'react';
import styled from 'styled-components';

const Message = styled.h3`
  border-bottom: 3px solid #ff9900;
  padding: .5em 1em;
`
const NoItemsMessage = () => <Message>No items found.</Message>

export default NoItemsMessage;
