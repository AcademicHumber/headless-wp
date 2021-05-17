import styled from "styled-components"
import { above, globals } from "./index"

export const StyledSocials = styled.section`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-between;
`

export const StyledHeader = styled.header.attrs(props => ({
  background: props.background || "#ccc",
}))`
  // Positioning

  grid-column: 1 / -1;
  grid-row: 2 / 3;
  z-index: 3;

  & .navigation-items {
    background: ${props => props.background};
    // Grid box
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;

    justify-items: center;
    & > section {
      width: 100%;
    }
    .site-logo {
      grid-column: 1 / 2;
    }
  }

  .hero {
    background: ${props => props.background};
    padding: 20vh 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0 0 50% 50%;
  }

  ${above.medium`
    
  `}
  ${above.large`
    .MuiAppBar-root{
      padding: 0 8vw;
    }
  `}
`

export const StyledMenu = styled.section`
  grid-column: 2 / 3;
  display: flex;
  justify-content: space-evenly;

  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: black;
  }

  .menu-item {
    display: flex;
    align-items: center;
  }
`
