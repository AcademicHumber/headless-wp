import { Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import parse from "html-react-parser"
import { Button } from "@material-ui/core"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"
import { useImage } from "../../../hooks/get-image"
import { GatsbyImage } from "gatsby-plugin-image"

export default function GridSection({
  data: { title, description, buttonText, buttonUri, images },
}) {
  const theme = useTheme()

  const image1 = useImage(images.image1)
  const image2 = useImage(images.image2)
  const image3 = useImage(images.image3)

  return (
    <StyledGridSection theme={theme}>
      <div className="container">
        <div className="info">
          <Typography variant="h3" color="textPrimary">
            {title}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="div">
            {parse(description)}
          </Typography>
          <Button
            variant="text"
            color="primary"
            href={buttonUri.uri}
            endIcon={<ArrowRightAltIcon />}
          >
            {buttonText}
          </Button>
        </div>
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
      </div>
    </StyledGridSection>
  )
}

const StyledGridSection = styled.section.attrs(props => ({
  theme: props.theme,
}))`
  background-color: #ebebeb5e;

  .container {
    display: flex;
    max-width: 130rem;
    margin: 0 auto;
    padding: 5rem 2rem;
    flex-wrap: wrap;
    align-items: center;

    // Reverse Column on mobile
    flex-direction: column-reverse;
    @media (min-width: 76.8rem) {
      padding: 5rem 0 1rem;
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
        margin: 2rem 0;
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
        grid-row: 1 / 3;
        z-index: 1;
        max-height: 80%;
        align-self: flex-start;
      }
      .secondImage {
        // This image will be the center point for the others
        grid-column: 2 / 6;
        grid-row: 1 / 5;
      }
      .thirdImage {
        // The third image will float at the right corner around the second
        grid-column: 5 / 7;
        grid-row: 3 / 5;
      }
    }
  }
`

export const GridSectionQuery = graphql`
  fragment GridSectionQuery on WpPage_Aboutpagedata {
    section2 {
      title
      description
      buttonText
      buttonUri {
        ... on WpPage {
          uri
        }
      }
      images {
        image3 {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, placeholder: BLURRED, width: 300)
            }
          }
        }
        image2 {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, placeholder: BLURRED, width: 600)
            }
          }
        }
        image1 {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, placeholder: BLURRED, width: 300)
            }
          }
        }
      }
    }
  }
`
