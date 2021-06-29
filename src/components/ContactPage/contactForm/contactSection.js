import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import parse from "html-react-parser"
import ContactForm from "./contactForm"

export default function ContactSection({
  data: { title, descripcion, formIntructions },
}) {
  return (
    <StyledContactSection>
      <div className="info">
        <Typography variant="h2" color="textPrimary">
          {title}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="div">
          {parse(descripcion)}
        </Typography>
      </div>
      <div className="contactForm">
        <ContactForm formIntructions={formIntructions} />
      </div>
    </StyledContactSection>
  )
}

const StyledContactSection = styled.section`
  display: flex;
  max-width: 130rem;
  margin: 0 auto;
  padding: 5rem 2rem;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #ccc;

  // Column on mobile
  flex-direction: column;
  @media (min-width: 76.8rem) {
    padding: 10rem 0;
    flex-direction: row;
    text-align: left;
    justify-content: space-between;

    .contactForm,
    .info {
      flex-basis: 45%;
    }
  }

  .info {
    p {
      margin: 2rem 0;
    }
  }
`
