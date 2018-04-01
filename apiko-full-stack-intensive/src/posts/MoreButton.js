import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: 2px solid #ada3a3;
  border-radius: 20px;
  margin: 1rem;
  padding: .7rem .5rem;
  background-color: #ff9900;
  min-width: 5rem;
  color: white;
  font-weight: 400;
  font-size: 1.2rem;
  &:focus{
    outline: none;
    box-shadow: 0 0 7px 3px #806d6d;
  }
`

const MoreButton = ({ onClick }) => <Button onClick={onClick}>More</Button>;

export default MoreButton;
