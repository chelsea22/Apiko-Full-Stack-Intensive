import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1rem;
`

const StyledSearch = styled.input`
  padding: .15rem .5rem;
  font-size: .95rem;
  &:focus{
    outline-color: #ff9900;
  }
`
const ClearIcon = styled.svg`
  cursor: pointer;
  margin-left: -1.5rem;
  fill: #ada3a3;
  height: 1rem;
  width: 1rem;
`

const Search = ({ value, onSearch }) => (
  <SearchContainer>
    <StyledSearch 
      onChange={(e) => onSearch(e.target.value.substr(0,30))}
      value={value}
      placeholder="Search..." 
    />
    {value 
      && <ClearIcon onClick={() => onSearch("")} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
      </ClearIcon>
    }
  </SearchContainer>
);

export default Search;
