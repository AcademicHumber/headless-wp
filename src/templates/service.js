import { graphql } from "gatsby"
import React from "react"
import Header from "../components/Header/header"
import heroBackground from "../../content/assets/fondo-hero.png"
import { Typography } from "@material-ui/core"
import Footer from "../components/Footer/footer"
import Seo from "../components/seo"
import { StyledMainContentContainer } from "../styles/components"
import parse from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image"
import { useImage } from "../hooks/get-image"
import Cta from "../components/cta"

export default function Service({ data: { previous, next, service } }) {
  const serviceName = service.title
  const { informacionDelServicio, areaKnowledge, images } =
    service.datosSobreElServicio

  const image1 = useImage(images.firstImage)
  const image2 = useImage(images.secondImage)

  const ctaTexts = {
    ctaTitle: "¿Es el servicio que necesitas?",
    ctaSubtitle:
      "Contactate con nosotros para empezar a llevar un seguimiento a tu caso",
    ctaButtonText: "Contactarse",
    ctaButtonUri: {
      uri: "/contacto/",
    },
  }

  return (
    <>
      <Header background={heroBackground}>
        <section className="hero">
          <Typography variant="h1" color="textPrimary">
            {serviceName}
          </Typography>
          <Typography variant="caption"> Inicio → Servicios</Typography>
        </section>
      </Header>
      <Seo title={serviceName} />
      <StyledMainContentContainer>
        <section className="service-container">
          <section className="serviceInfo">
            <Typography
              variant="body1"
              component="div"
              color="textPrimary"
              className="service-content"
            >
              {parse(informacionDelServicio)}
            </Typography>
            {image1 && (
              <GatsbyImage image={image1.image} alt={image1.altText} />
            )}
          </section>
          <section className="serviceInfo">
            {image2 && (
              <GatsbyImage image={image2.image} alt={image2.altText} />
            )}

            <Typography
              variant="body1"
              component="div"
              color="textPrimary"
              className="service-content"
            >
              {parse(areaKnowledge)}
            </Typography>
          </section>
        </section>
      </StyledMainContentContainer>
      <Cta data={ctaTexts} />
      <Footer />
    </>
  )
}

export const serviceQuery = graphql`
  query serviceById(
    $id: String!
    $previousServiceId: String
    $nextServiceId: String
  ) {
    service: wpServicio(id: { eq: $id }) {
      datosSobreElServicio {
        informacionDelServicio
        areaKnowledge
        images {
          secondImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100, placeholder: TRACED_SVG)
              }
            }
          }
          firstImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100, placeholder: TRACED_SVG)
              }
            }
          }
        }
      }
      uri
      title
    }
    previous: wpServicio(id: { eq: $previousServiceId }) {
      uri
      title
    }
    next: wpServicio(id: { eq: $nextServiceId }) {
      uri
      title
    }
  }
`
