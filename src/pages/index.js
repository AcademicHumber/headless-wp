import React from "react"
import Seo from "../components/seo"
import Header from "../components/Header/header"
import { graphql, useStaticQuery } from "gatsby"
import HeroHome from "../components/Home/heroHome"
import ServiceHome from "../components/Home/Services/serviceHome"
import Footer from "../components/Footer/footer"
import AboutHome from "../components/Home/About/aboutHome"
import styled from "styled-components"
// Background
import HomeHeroBg from "../../content/assets/home-hero-background.png"
import HomeBg from "../../content/assets/home-about-background.png"
import ReviewsHome from "../components/Home/Reviews/reviewsHome"
import BlogSliderHome from "../components/Home/Blog/blogSliderHome"
import { Typography } from "@material-ui/core"
import { StyledButton } from "../styles/components"

export default function HomePage() {
  const {
    wpPage: { homePageData },
  } = useStaticQuery(graphql`
    query HomePageData {
      wpPage(isFrontPage: { eq: true }) {
        homePageData {
          # Page info
          title

          # Hero data
          ...HeroSectionData

          # Services data
          ...ServicesSectionData

          # About data
          ...AboutSectionData

          # Reviews Data
          ...ReviewsSectionData

          # Blog data
          ...BlogSectionData

          # CTA
          cta {
            ctaMessage
            ctaButton {
              text
              uri {
                ... on WpPage {
                  uri
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <StyledHomePage>
      <Header background={HomeHeroBg} currentMenuPage="Inicio">
        <HeroHome heroData={homePageData.heroSection} />
      </Header>
      <Seo title={homePageData.title} />
      <ServiceHome servicesData={homePageData.featuredServicesData} />

      <AboutHome aboutData={homePageData.companyData} background={HomeBg} />

      <div
        className="shared-background"
        style={{
          background: `url(${HomeBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <ReviewsHome reviewsData={homePageData.reviews} />
        <BlogSliderHome blogData={homePageData.blogHome} />
      </div>
      <div className="cta">
        <Typography variant="h2" color="textPrimary" className="HomeSubtitle">
          {homePageData.cta.ctaMessage}
        </Typography>
        <StyledButton
          variant="contained"
          color="primary"
          href={homePageData.cta.ctaButton.uri.uri}
        >
          {homePageData.cta.ctaButton.text}
        </StyledButton>
      </div>
      <Footer />
    </StyledHomePage>
  )
}

const StyledHomePage = styled.main`
  padding: 0;
  margin: 0;

  .HomeSubtitle {
    max-width: 85rem;
    max-width: 0 auto;
    margin: 0 auto;
    text-align: center;
  }

  .cta {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    max-width: 130rem;
    margin: 0 auto;
    padding: 8rem 0;

    & a {
      align-self: center;
    }
  }
`
