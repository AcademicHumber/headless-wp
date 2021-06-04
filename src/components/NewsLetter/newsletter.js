import React from "react"
import styled from "styled-components"
import heroBackground from "../../../content/assets/fondo-hero.png"
import { Typography } from "@material-ui/core"
import NewsletterForm from "./newsletterForm"
import { above } from "../../styles/index"

const Texts = {
  title: "Suscríbete a nuestro boletín y entérate de las últimas novedades",
  description:
    "La mejor forma de estar al día con temas de nuestro rubro es suscribirse a nuestro boletín gratis y recibir la última información en tu correo.",
  placeholder: "Correo electrónico",
  buttonText: "Suscribirse",
  caption: "No compartimos tu información con nadie",
}

export default function NewsLetter() {
  return (
    <>
      <StyledNewsLetter background={`url(${heroBackground})`}>
        <div className="newsletter--container">
          <Typography variant="h2" color="textPrimary">
            {Texts.title}
          </Typography>

          <Typography variant="body1" color="textPrimary">
            {Texts.description}
          </Typography>

          <NewsletterForm Texts={Texts} />
        </div>
      </StyledNewsLetter>
    </>
  )
}

const StyledNewsLetter = styled.div.attrs(props => ({
  background: props.background || "#ccc",
}))`
  /* Set Background */
  background: ${props => props.background};

  /* Properties */
  padding: 10rem 2rem;
  text-align: center;
  .newsletter--container {
    max-width: 97.5rem;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }
  h1 {
    font-weight: bold;
  }

  form {
    padding-top: 1.5rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 1.5rem;

    .MuiOutlinedInput-input {
      padding: 1.8rem 2.5rem;
    }

    .MuiButton-root {
      padding: 1.4rem 2.5rem;
      margin: 0 1rem;
    }
    .form-caption {
      flex-basis: 100%;
      opacity: 0.6;
    }

    ${above.mediumL`
    .MuiFormControl-root {
          flex-basis: 40%;
    }
    .MuiButton-root {      
      flex-basis: 20%;
    }
    `}
  }
`
