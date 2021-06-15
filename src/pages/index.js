import React from "react"
import SEO from "../components/seo"
import Header from "../components/Header/header"
import HomeHeroBg from "../../content/assets/home-hero-background.png"
import { graphql, useStaticQuery } from "gatsby"
import { Typography } from "@material-ui/core"
import { StyledButton } from "../styles/components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { above } from "./index"
import Footer from "../components/Footer/footer"

export default function HomePage() {
  const {
    wpPage: { homePageData },
  } = useStaticQuery(graphql`
    query HomePageData {
      wpPage(isFrontPage: { eq: true }) {
        homePageData {
          # Page info

          title
          pageContent

          # Hero texts
          textoDelBotonHeader
          textoPrincipalHeader
          textoSecundarioHeader
          secondaryHeroButton

          # Request Hero Images data

          imagenHeader {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100, placeholder: BLURRED, width: 300)
              }
            }
          }
          imagenHeader2 {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100, placeholder: BLURRED, width: 300)
              }
            }
          }
          imagenHeader3 {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100, placeholder: BLURRED, width: 300)
              }
            }
          }

          # End hero images data
        }
      }
    }
  `)

  const firstImage = getImage(
    homePageData.imagenHeader.localFile?.childImageSharp
  )
  const secondImage = getImage(
    homePageData.imagenHeader2.localFile?.childImageSharp
  )
  const thirdImage = getImage(
    homePageData.imagenHeader3.localFile?.childImageSharp
  )

  return (
    <>
      <Header background={HomeHeroBg}>
        <HeroHome className="home-hero">
          <div className="heroLeft">
            <Typography variant="h1" color="textPrimary">
              {homePageData.textoPrincipalHeader}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {homePageData.textoSecundarioHeader}
            </Typography>
            <div className="ctaButtons">
              <StyledButton variant="contained" color="primary">
                {homePageData.textoDelBotonHeader}
              </StyledButton>
              <StyledButton variant="contained">
                {homePageData.secondaryHeroButton}
              </StyledButton>
            </div>
          </div>
          <div className="heroRight">
            <GatsbyImage
              image={firstImage}
              alt={homePageData.imagenHeader.altText}
              className="firtsImage"
            />
            <GatsbyImage
              image={secondImage}
              alt={homePageData.imagenHeader2.altText}
              className="secondImage"
            />
            <GatsbyImage
              image={thirdImage}
              alt={homePageData.imagenHeader3.altText}
              className="thirdImage"
            />
          </div>
        </HeroHome>
      </Header>
      <SEO title={homePageData.title} />
      <Footer />
    </>
  )
}

const HeroHome = styled.section`
  display: flex;
  justify-content: center;
  max-width: 130rem;
  margin: 0 auto;
  padding: 5rem 0;
  align-items: center;
  flex-wrap: wrap;

  // Reverse the column on mobile
  flex-direction: column-reverse;
  @media (min-width: 76.8rem) {
    flex-direction: row;
  }

  .heroLeft {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 76.8rem) {
      flex-basis: 50%;
    }

    .ctaButtons {
      display: flex;
      gap: 2rem;
    }
  }

  .heroRight {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(4, 1fr);
    align-items: center;
    padding: 2rem;

    @media (min-width: 76.8rem) {
      flex-basis: 50%;
    }

    // Common css for images
    .gatsby-image-wrapper {
      border-radius: 1rem;
      box-shadow: 0px 1px 3px 2px rgba(0, 0, 0, 0.3);
    }

    // Positions for the images
    .firtsImage {
      // The first image will float at the left corner around the second
      grid-column: 1 / 3;
      grid-row: 1 / 3;
      z-index: 1;
      max-height: 90%;
    }
    .secondImage {
      // This image will be the center point for the others
      grid-column: 2 / 5;
      grid-row: 2 / 5;
    }
    .thirdImage {
      // The third image will float at the right corner around the second
      grid-column: 4 / 6;
      grid-row: 1 / 3;
      max-height: 60%;
    }
  }
`
