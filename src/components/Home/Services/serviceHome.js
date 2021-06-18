import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import { StyledButton } from "../../../styles/components"
import { graphql, Link } from "gatsby"
import ServiceCard from "./serviceCard"

export default function ServiceHome({ servicesData }) {
  const {
    featuredServicesSubtitle,
    featuredServicesTitle,
    featuredServicesButton,
    featuredServicesButtonUrl,
    featuredServices,
  } = servicesData

  return (
    <StyledServicesHome>
      <Typography variant="body1" color="textSecondary">
        {featuredServicesSubtitle}
      </Typography>
      <Typography variant="h2" color="textPrimary" className="HomeSubtitle">
        {featuredServicesTitle}
      </Typography>
      <div className="services">
        {featuredServices.map(service => (
          <ServiceCard service={service} key={service.uri} />
        ))}
      </div>
      <Link to={featuredServicesButtonUrl.uri}>
        <StyledButton variant="contained" color="primary">
          {featuredServicesButton}
        </StyledButton>
      </Link>
    </StyledServicesHome>
  )
}

const StyledServicesHome = styled.section`
  display: flex;
  justify-content: center;
  max-width: 130rem;
  margin: 0 auto;
  flex-direction: column;
  text-align: center;
  padding: 6rem 0 8rem;

  .services {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 5rem 0;
  }

  @media (max-width: 76.8rem) {
    padding: 8rem 2rem;
  }
`

// Fragment fot the services information
export const servicesQuery = graphql`
  fragment ServicesSectionData on WpPage_Homepagedata {
    featuredServicesData {
      featuredServicesSubtitle
      featuredServicesTitle
      featuredServices {
        ... on WpServicio {
          title
          uri
        }
      }
      featuredServicesButton
      featuredServicesButtonUrl {
        ... on WpPage {
          uri
        }
      }
    }
  }
`
