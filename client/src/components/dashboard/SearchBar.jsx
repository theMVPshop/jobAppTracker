import styled from "styled-components";
import { Icon } from "@blueprintjs/core";
// import { DataContext } from "../../App";
import React, { useContext, useState } from "react";

const SearchBar = () => {
  //   const { searchQuery, setSearchQuery } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState("");

  const cancel = () => {
    setSearchQuery("");
  };

  return (
    <SearchWrapper>
      <SearchInput>
        <StyledIcon icon="search" size={15} />
        <input
          type="text"
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
          placeholder="Search job titles or companies..."
          value={searchQuery}
        />
        {searchQuery ? (
          <ClearBtn onClick={cancel}>
            <StyledIcon icon="cross" size={20} />
          </ClearBtn>
        ) : (
          <div></div>
        )}
      </SearchInput>
    </SearchWrapper>
  );
};

export default SearchBar;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  @media only screen and (max-width: 980px) {
    width: 100%;
  }
`;

const SearchInput = styled.form`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 10px;
  background-color: ${(props) => props.theme.colors.primaryWhite};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  color: #fff !important;
  padding: 5px 10px;
  width: 400px;
  @media only screen and (max-width: 980px) {
    width: 100%;
  }
  height: 30px;
  &:focus-within {
    border: 1px solid ${(props) => props.theme.colors.primaryBlue};
  }
  input {
    border: 0;
    height: inherit;
    /* background-color: ${(props) => props.theme.colors.gray1}; */
    text-overflow: ellipsis;
    width: 100%;
    /* color: ${(props) => props.theme.colors.gray2}; */
    &::placeholder {
      color: inherit;
    }
    &:focus {
      outline: none;
    }
  }
`;

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.gray2};
  display: flex;
  align-items: center;
`;

const ClearBtn = styled.div`
  padding: 5px;
  border-radius: 999px;
  &:hover {
    &:hover {
      :first-child {
        fill: red;
      }
    }
  }
`;
