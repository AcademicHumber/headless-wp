import React from "react"
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"
import styled from "styled-components"
import { above, globals } from "../../styles/index"

const StyledSearchBar = styled.div`
  border-radius: ${globals.borderRadius};
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
  margin-left: 0;
  width: "100%";

  .icon {
    padding: 3px;
    height: 100%;
    position: absolute;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .MuiInputBase-input {
    padding: 10px 5px;
    padding-left: 1.9em;
    transition: all 0.5s;
    width: 100%;

    ${above.medium`
        width: 10em;

        &:focus {
            width: 15em;
        }
    `}
  }
`

export default function SearchBar() {
  return (
    <StyledSearchBar>
      <div className="icon">
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Buscar..."
        inputProps={{ "aria-label": "search" }}
      />
    </StyledSearchBar>
  )
}
