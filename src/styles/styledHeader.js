import styled from "styled-components"
import { above } from "./index"

export const StyledSocials = styled.section`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-between;
`

export const StyledHeader = styled.header.attrs(props => ({
  background: props.background || "#ccc",
}))`
  @media (max-width: 76.8rem) {
    padding: 0 2rem;
  }
  // Logo css
  .site-logo {
    display: flex;
    gap: 1rem;

    h1 {
      font-size: 3.6rem;
      @media (min-width: 60rem) {
        font-size: 4.2rem;
      }
    }
    .logo-image {
      height: 4rem;
      min-width: 4rem;
      @media (min-width: 60rem) {
        height: 4rem;
        min-width: 5rem;
      }
    }
  }

  // Menus css

  .desktop-menu {
    display: none;
  }

  @media (min-width: 90rem) {
    .desktop-menu {
      display: flex;
    }
    .mobile-menu {
      display: none;
    }
  }

  // Positioning

  grid-column: 1 / -1;
  grid-row: 2 / 3;
  z-index: 3;
  background: ${props => props.background};
  background-repeat: no-repeat;
  background-position: bottom;

  @media (max-width: 76.8rem) {
    background-position: top;
  }

  /* Spacing */
  .site-logo,
  .desktop-menu {
    padding-top: 2.5rem;
  }

  & .navigation-items {
    // Grid box
    display: grid;
    grid-template-columns: 1fr 2fr 0.5fr;
    max-width: 130rem;
    margin: auto;
    padding: 0;

    justify-items: center;
    & > section {
      width: 100%;
    }
    .site-logo {
      grid-column: 1 / 2;
    }

    a.MuiButton-root {
      align-self: flex-end;

      @media (max-width: 76.8rem) {
        display: none;
      }
    }
  }

  // Components css
  .hero {
    padding: 20vh 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0 0 30% 30%;
    text-align: center;
  }

  ${above.medium`
    
  `}
  ${above.large`
    .MuiAppBar-root{
      padding: 0 8vw;
    }
  `}
`

export const StyledMenu = styled.section.attrs(props => ({
  theme: props.theme,
}))`
  grid-column: 2 / 3;
  display: flex;
  justify-content: space-evenly;

  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${props => props.theme.palette.text.primary};
  }

  .menu-item {
    display: flex;
    align-items: center;
    font-weight: bold;

    .active {
      color: ${props => props.theme.palette.primary.main};
    }
  }

  @media (max-width: 600px) {
    display: none;
  }
`
