import React from 'react';
import styled from 'styled-components';

const StyledMessage = styled.h3`
  border-bottom: 3px solid #ff9900;
  padding: .5em 1em;
`
const Message = ({ children }) => (
  <StyledMessage>{children}</StyledMessage>
);

export default Message;
