import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Footer from "../components/Footer/footer"
import Header from "../components/Header/header"
import { Typography } from "@material-ui/core"
import heroBackground from "../../content/assets/fondo-hero.png"
import Seo from "../components/seo"
import styled from "styled-components"
import SectionWithVideo from "../components/About/SectionWithVideo/sectionWithVideo"
import GridSection from "../components/About/GridSection/gridSection"
import SimpleCta from "../components/simpleCta"

export default function Nosotros() {
  const {
    wpPage: { aboutPageData },
  } = useStaticQuery(graphql`
    query aboutPageData {
      wpPage(slug: { eq: "sobre-nosotros" }) {
        aboutPageData {
          # Titles
          title
          subtitle
          description

          # Video section
          section1 {
            title
            description
            buttonText
            buttonUri {
              ... on WpPage {
                uri
              }
            }
            video
          }

          # Images grid section

          ...GridSectionQuery

          #Call to action
          callToAction {
            ctatitle
            buttonText
            buttonUri {
              ... on WpPage {
                uri
              }
            }
          }
        }
      }
    }
  `)

  return (
    <StyledAboutPage>
      <Header currentMenuPage="Sobre Nosotros" background={heroBackground}>
        <section className="hero">
          <Typography variant="h1" color="textPrimary">
            {aboutPageData.title}
          </Typography>
          <Typography variant="caption">
            {" "}
            Home - {aboutPageData.title}
          </Typography>
        </section>
        <Seo title="Sobre nosotros" />
      </Header>
      <div className="subtitles">
        <Typography variant="h2" color="textPrimary">
          {aboutPageData.subtitle}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {aboutPageData.description}
        </Typography>
      </div>

      <SectionWithVideo data={aboutPageData.section1} />
      <GridSection data={aboutPageData.section2} />
      <SimpleCta
        title={aboutPageData.callToAction.ctatitle}
        buttonText={aboutPageData.callToAction.buttonText}
        buttonUri={aboutPageData.callToAction.buttonUri.uri}
      />
      <Footer />
    </StyledAboutPage>
  )
}

const StyledAboutPage = styled.section`
  .subtitles {
    max-width: 130rem;
    padding: 4rem 2rem;
    margin: 0 auto;
    text-align: center;

    h2 {
      max-width: 85rem;
      margin: 2rem auto;
    }

    p {
      max-width: 105rem;
      margin: 0 auto;
    }
  }
`
