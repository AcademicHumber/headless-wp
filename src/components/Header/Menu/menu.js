import React from "react"
import { bool, func } from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"
import MenuChildren from "../menuChildren"
import { useMenu } from "../../../hooks/get-menu"
import { useTheme } from "@material-ui/core/styles"
import Logo from "../../logo"
import { Typography } from "@material-ui/core"
import parse from "html-react-parser"

export default function Menu({ open, title }) {
  const theme = useTheme()
  const menu = useMenu()

  return (
    <StyledMenu theme={theme} open={open}>
      <section className="mobile-menu-logo">
        <Logo />
        <Typography color="textPrimary" variant="h3">
          {parse(title)}
        </Typography>
      </section>
      {menu.map((menuItem, index) => {
        if (!menuItem.children.length) {
          return (
            <div className="menu-item" key={menuItem.id}>
              <Link to={menuItem.path}>{menuItem.label}</Link>
            </div>
          )
        } else {
          return (
            <div className="menu-item with-children" key={menuItem.id}>
              <Link to={menuItem.path}>{menuItem.label}</Link>
              <MenuChildren key={index} child={menuItem.children} />
            </div>
          )
        }
      })}
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
}

const StyledMenu = styled.nav.attrs(props => ({
  theme: props.theme,
  open: props.open,
}))`
  // Handle animation

  //hide and show
  transform: ${props => (props.open ? "translateX(0)" : "translateX(101%)")};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.palette.primary.main};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: fixed;
  z-index: 9;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 50rem) {
    width: 100%;
  }

  //Site logo css

  .mobile-menu-logo {
    display: flex;
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    gap: 1rem;

    & .logo-image {
      height: 4rem;
      min-width: 4rem;
    }

    & h3 {
      font-weight: bold;
      padding: 1rem 0;
      color: ${props => props.theme.palette.secondary.light};
    }
  }

  // Menu items css

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    display: inline-block;
    font-weight: bold;
    letter-spacing: 0.2rem;
    color: ${props => props.theme.palette.secondary.light};
    text-decoration: none;
    transition: color 0.2s linear;

    @media (max-width: 50rem) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      opacity: 0.9;
    }
  }

  // Handle menu childrens

  .with-children {
    display: flex;

    & svg {
      border: 1px solid ${props => props.theme.palette.secondary.light};
      border-radius: 50%;
      fill: ${props => props.theme.palette.secondary.light};
    }

    & li a {
      color: ${props => props.theme.palette.text.primary};
    }
  }
`
