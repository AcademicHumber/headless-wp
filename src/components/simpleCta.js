import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import { StyledButton } from "../styles/components"

export default function SimpleCta({ title, buttonText, buttonUri }) {
  return (
    <StyledCta>
      <Typography variant="h2" color="textPrimary" className="HomeSubtitle">
        {title}
      </Typography>
      <StyledButton variant="contained" color="primary" href={buttonUri}>
        {buttonText}
      </StyledButton>
    </StyledCta>
  )
}

const StyledCta = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  max-width: 130rem;
  margin: 0 auto;
  padding: 8rem 0;
  text-align: center;

  & a {
    align-self: center;
  }
`
