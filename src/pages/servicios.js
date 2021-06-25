import React from "react"
import Footer from "../components/Footer/footer"
import Header from "../components/Header/header"
import heroBackground from "../../content/assets/fondo-hero.png"
import { Typography } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import CompanyInfo from "../components/ServicesPage/companyInfo"
import Seo from "../components/seo"
import styled from "styled-components"
import ServicesSection from "../components/ServicesPage/Services/servicesSection"
import Cta from "../components/cta"
import SimpleCta from "../components/simpleCta"

export default function Servicios() {
  const {
    wpPage: { servicesPageData },
    allWpServicio: { services },
  } = useStaticQuery(graphql`
    query servicesPageData {
      # Get services page info
      wpPage(slug: { eq: "servicios" }) {
        servicesPageData {
          # Hero text
          title

          # Services section
          services {
            subtitle
            title
          }
          # First Cta
          firstCta {
            ctaTitle
            ctaSubtitle
            ctaButtonUri {
              ... on WpPage {
                uri
              }
            }
            ctaButtonText
          }

          # Company info
          ...CompanyDataSection

          #Second Cta
          secondCta {
            title
            buttonText
            buttonUri {
              ... on WpPage {
                id
                uri
              }
            }
          }
        }
      }

      # Get all services
      allWpServicio {
        services: nodes {
          title
          excerpt
          uri
        }
      }
    }
  `)

  return (
    <StyledServicesPage>
      <Header background={heroBackground}>
        <section className="hero">
          <Typography variant="h1" color="textPrimary">
            {servicesPageData.title}
          </Typography>
          <Typography variant="caption"> Home - Servicios</Typography>
        </section>
      </Header>
      <Seo title="Servicios" />

      {/* Services section*/}
      {services.length > 0 && (
        <ServicesSection data={servicesPageData.services} services={services} />
      )}

      {/* First call to action */}

      <Cta data={servicesPageData.firstCta} />

      {/* Company info section*/}
      <CompanyInfo data={servicesPageData.aboutCompany} />

      {/* Second Cta */}

      <SimpleCta
        title={servicesPageData.secondCta.title}
        buttonText={servicesPageData.secondCta.buttonText}
        buttonUri={servicesPageData.secondCta.buttonUri.uri}
      />

      <Footer />
    </StyledServicesPage>
  )
}

const StyledServicesPage = styled.main`
  padding: 0;
  margin: 0;

  .servicesSubtitle {
    max-width: 85rem;
    max-width: 0 auto;
    margin: 0 auto;
    text-align: center;
  }
`
