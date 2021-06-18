import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import { StyledButton } from "../../styles/components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, Link } from "gatsby"

export default function HeroHome({ heroData }) {
  const firstImage = {
    image: getImage(
      heroData.heroImages.heroFirstImage.localFile?.childImageSharp
    ),
    altText: heroData.heroImages.heroFirstImage.altText,
  }
  const secondImage = {
    image: getImage(
      heroData.heroImages.heroSecondImage.localFile?.childImageSharp
    ),
    altText: heroData.heroImages.heroSecondImage.altText,
  }
  const thirdImage = {
    image: getImage(
      heroData.heroImages.heroThirdImage.localFile?.childImageSharp
    ),
    altText: heroData.heroImages.heroSecondImage.altText,
  }
  return (
    <StyledHeroHome className="home-hero">
      <div className="heroLeft">
        <Typography variant="h1" color="textPrimary">
          {heroData.heroTitle}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {heroData.heroDescription}
        </Typography>
        <div className="ctaButtons">
          <Link to={heroData.heroPrincipalButtonUrl.uri}>
            <StyledButton variant="contained" color="primary">
              {heroData.heroPrincipalButton}
            </StyledButton>
          </Link>
          {heroData.heroSecondaryButton && (
            <Link to={heroData.heroSecondaryButtonUrl.uri}>
              <StyledButton variant="contained">
                {heroData.heroSecondaryButton}
              </StyledButton>
            </Link>
          )}
        </div>
      </div>
      <div className="heroRight">
        <GatsbyImage
          image={firstImage.image}
          alt={firstImage.altText}
          className="firtsImage"
        />
        <GatsbyImage
          image={secondImage.image}
          alt={secondImage.altText}
          className="secondImage"
        />
        <GatsbyImage
          image={thirdImage.image}
          alt={thirdImage.altText}
          className="thirdImage"
        />
      </div>
    </StyledHeroHome>
  )
}

// Styles of the hero component
const StyledHeroHome = styled.section`
  display: flex;
  justify-content: center;
  max-width: 130rem;
  margin: 0 auto;
  padding: 5rem 0;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;

  // Reverse the column on mobile
  flex-direction: column-reverse;
  @media (min-width: 76.8rem) {
    flex-direction: row;
    text-align: left;
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
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
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
  @media (max-width: 76.8rem) {
    padding: 0;
  }
`

// Fragment fot the hero information
export const heroQuery = graphql`
  fragment HeroSectionData on WpPage_Homepagedata {
    heroSection {
      # Hero texts
      heroTitle
      heroDescription

      # Hero Buttons
      heroPrincipalButton
      heroPrincipalButtonUrl {
        ... on WpPage {
          uri
        }
      }

      heroSecondaryButton
      heroSecondaryButtonUrl {
        ... on WpPage {
          uri
        }
      }

      # Hero images
      heroImages {
        heroFirstImage {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, placeholder: BLURRED, width: 300)
            }
          }
          altText
        }
        heroSecondImage {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, placeholder: BLURRED, width: 300)
            }
          }
          altText
        }
        heroThirdImage {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, placeholder: BLURRED, width: 300)
            }
          }
          altText
        }
      }
    }
  }
`
