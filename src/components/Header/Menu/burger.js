import React from "react"
import styled from "styled-components"
import { bool, func } from "prop-types"
import { useTheme } from "@material-ui/core/styles"

export default function Burger({ open, setOpen }) {
  const theme = useTheme()
  return (
    <StyledBurger
      background={theme.palette.primary.main}
      open={open}
      onClick={() => setOpen(!open)}
    >
      <span />
      <span />
      <span />
    </StyledBurger>
  )
}

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
}

const StyledBurger = styled.button.attrs(props => ({
  background: props.background || "#666",
}))`
  position: absolute;
  top: 3.5rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding-top: 0.2rem;
  z-index: 10;

  &:focus {
    outline: none;
  }

  span {
    width: 2rem;
    height: 0.3rem;
    background: ${props => (props.open ? "#fff" : props => props.background)};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: ${props => (props.open ? "fixed" : "relative")};

    :first-child {
      transform: ${props => (props.open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${props => (props.open ? "0" : "1")};
      transform: ${props =>
        props.open ? "translateX(-20px)" : "translateX(0)"};
    }

    :nth-child(3) {
      transform: ${props => (props.open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`
