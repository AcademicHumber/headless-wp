import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import AboutCard from "./aboutCard"
import Recognition from "./recognition"

export default function AboutHome({ aboutData, background }) {
  // Datos principales de la sección

  const {
    companyDataTitle,
    companyDataPoints,
    companyDataImage,
    companyDataRecognitions,
  } = aboutData

  // Datos de la compañía

  const { companyDataFirst, companyDataSecond, companyDataThird } =
    companyDataPoints

  // Reconocimientos de la compañía

  const {
    companyDataRecognitionFirst,
    companyDataRecognitionSecond,
    companyDataRecognitionThird,
  } = companyDataRecognitions

  // Imagen de la sección

  const aboutImage = {
    image: getImage(companyDataImage.localFile?.childImageSharp),
    altText: companyDataImage.altText,
  }

  return (
    <StyledAboutSection background={background}>
      <div className="container">
        <Typography variant="h2" color="textPrimary" className="HomeSubtitle">
          {companyDataTitle}
        </Typography>

        <div className="aboutData">
          <div className="aboutLeft">
            <AboutCard
              title={companyDataFirst.companyDataFirstTitle}
              description={companyDataFirst.companyDataFirstDescription}
            />
            <AboutCard
              title={companyDataSecond.companyDataSecondTitle}
              description={companyDataSecond.companyDataSecondDescription}
            />
            <AboutCard
              title={companyDataThird.companyDataThirdTitle}
              description={companyDataThird.companyDataThirdDescription}
            />
          </div>
          <div className="aboutRight">
            <GatsbyImage image={aboutImage.image} alt={aboutImage.altText} />
          </div>
        </div>

        <div className="aboutRecognitions">
          <Recognition data={companyDataRecognitionFirst} />
          <Recognition data={companyDataRecognitionSecond} />
          <Recognition data={companyDataRecognitionThird} />
        </div>
      </div>
    </StyledAboutSection>
  )
}

const StyledAboutSection = styled.section.attrs(props => ({
  background: props.background || "#ccc",
  theme: props.theme || "",
}))`
  background: url(${props => props.background});
  background-position: center;
  background-repeat: no-repeat;

  .container {
    padding: 8rem 0;
    max-width: 130rem;
    margin: 0 auto;
    border-bottom: 1px solid #ccc;

    @media (max-width: 76.8rem) {
      padding: 5rem 2rem;
    }

    .aboutData {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      flex-direction: column-reverse;
      padding: 7rem 0;

      .aboutLeft {
        .companyData {
          display: grid;
          grid-template-columns: 4rem 1fr;
          grid-template-rows: 4rem minmax(7rem, auto);
          align-items: center;
          padding: 2rem;
          transition: all 0.3s ease;

          svg {
            grid-column: 1/2;
            grid-row: 1/2;
            text-align: center;
            fill: #17c434;
          }

          h4 {
            grid-column: 2/3;
            grid-row: 1/2;
          }

          p {
            grid-column: 2/3;
            grid-row: 2/3;
          }

          &:hover {
            box-shadow: 0px 1px 3px 2px rgb(0 0 0 / 30%);
            background-color: white;
            border-radius: 0.5rem;
          }
        }
      }

      @media (min-width: 76.8rem) {
        flex-direction: row;

        .aboutLeft,
        .aboutRight {
          flex-basis: 45%;
        }
      }
    }

    .aboutRecognitions {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      max-width: 100rem;
      margin: 0 auto;
      align-items: center;
      padding: 4rem 0;
      text-align: center;

      @media (max-width: 76.8rem) {
        padding: 0;
        gap: 3rem;
      }

      .recognitionImage {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 150px;
        width: 150px;
        margin: 0 auto;
        border-radius: 50%;
        box-shadow: 0px 10px 25px 1px rgb(0 0 0 / 15%);
        background: #fff;
      }

      h4 {
        margin: 3rem 0 1rem;
      }
    }
  }
`

export const aboutQuery = graphql`
  fragment AboutSectionData on WpPage_Homepagedata {
    companyData {
      companyDataTitle

      # Datos sobre la empresa
      companyDataPoints {
        companyDataFirst {
          companyDataFirstTitle
          companyDataFirstDescription
        }
        companyDataSecond {
          companyDataSecondTitle
          companyDataSecondDescription
        }
        companyDataThird {
          companyDataThirdTitle
          companyDataThirdDescription
        }
      }

      # Imagen principal de la sección
      companyDataImage {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 100, placeholder: BLURRED, width: 600)
          }
        }
      }

      # Reconocimientos de la compañía

      companyDataRecognitions {
        companyDataRecognitionFirst {
          title
          description
          image {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100, placeholder: BLURRED, width: 80)
              }
            }
          }
        }
        companyDataRecognitionSecond {
          title
          description
          image {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100, placeholder: BLURRED, width: 80)
              }
            }
          }
        }
        companyDataRecognitionThird {
          title
          description
          image {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100, placeholder: BLURRED, width: 80)
              }
            }
          }
        }
      }
    }
  }
`
