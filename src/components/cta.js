import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import { StyledButton } from "../styles/components"
import heroBackground from "../../content/assets/fondo-hero.png"

/**
 * The component recieves a title, subtitle, button text and button url.
 * Send the text by the "data" prop.
 * @returns Call to action component
 */
export default function Cta({
  data: { ctaTitle, ctaSubtitle, ctaButtonText, ctaButtonUri },
}) {
  return (
    <StyledCta background={`url(${heroBackground})`}>
      <Typography variant="h2" color="textPrimary">
        {ctaTitle}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {ctaSubtitle}
      </Typography>
      <StyledButton variant="contained" color="primary" href={ctaButtonUri.uri}>
        {ctaButtonText}
      </StyledButton>
    </StyledCta>
  )
}

const StyledCta = styled.section.attrs(props => ({
  background: props.background || "#ccc",
}))`
  /* Set Background */
  background: ${props => props.background};

  /* Properties */
  padding: 10rem 2rem;
  text-align: center;

  p {
    margin: 1rem 0 4rem;
  }
`
