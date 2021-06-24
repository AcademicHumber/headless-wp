import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import { useImage } from "../../hooks/get-image"
import { GatsbyImage } from "gatsby-plugin-image"
import { StyledButton } from "../../styles/components"
import { Typography } from "@material-ui/core"

export default function CompanyInfo({
  data: { title, description, buttonText, buttonUri, images },
}) {
  const image1 = useImage(images.image1)
  const image2 = useImage(images.image2)
  const image3 = useImage(images.image3)

  return (
    <StyledCompanyInfo>
      <div className="grid-images">
        <GatsbyImage
          image={image1.image}
          alt={image1.altText}
          className="firtsImage"
        />
        <GatsbyImage
          image={image2.image}
          alt={image2.altText}
          className="secondImage"
        />
        <GatsbyImage
          image={image3.image}
          alt={image3.altText}
          className="thirdImage"
        />
      </div>

      <div className="info">
        <Typography variant="h2" color="textPrimary">
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {description}
        </Typography>

        <StyledButton variant="outlined" color="primary" href={buttonUri.uri}>
          {buttonText}
        </StyledButton>
      </div>
    </StyledCompanyInfo>
  )
}

const StyledCompanyInfo = styled.section`
  display: flex;
  max-width: 130rem;
  margin: 0 auto;
  padding: 5rem 2rem;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  border-bottom: 1px solid #ccc;

  // Reverse the column on mobile
  flex-direction: column;
  @media (min-width: 76.8rem) {
    padding: 5rem 0;
    flex-direction: row;
    text-align: left;
    justify-content: center;
    gap: 2rem;

    .grid-images,
    .info {
      flex-basis: 48%;
    }
  }

  .info {
    p {
      margin: 3rem 0;
    }
  }

  .grid-images {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
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
      grid-row: 3 / -1;
      z-index: 1;
    }
    .secondImage {
      // This image will be the center point for the others
      grid-column: 2 / 6;
      grid-row: 1 / 5;
    }
    .thirdImage {
      // The third image will float at the right corner around the second
      grid-column: 5 / 7;
      grid-row: 1 / 3;
      max-height: 70%;
      align-self: flex-start;
    }
  }
`

export const CompanyDataQuery = graphql`
  fragment CompanyDataSection on WpPage_Servicespagedata {
    aboutCompany {
      #Section texts
      title
      description

      # buttons
      buttonText
      buttonUri {
        ... on WpPage {
          uri
        }
      }

      #Images
      images {
        image3 {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, placeholder: BLURRED, width: 300)
            }
          }
          altText
        }
        image2 {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, placeholder: BLURRED, width: 600)
            }
          }
          altText
        }
        image1 {
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
