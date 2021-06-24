import React from "react"
import { Typography } from "@material-ui/core"
import styled from "styled-components"
import ServiceItem from "./serviceItem"

export default function ServicesSection({
  data: { title, subtitle },
  services,
}) {
  return (
    <StyledServicesSection>
      <Typography variant="body1" color="primary">
        {subtitle}
      </Typography>
      <Typography variant="h2" color="textPrimary" className="servicesSubtitle">
        {title}
      </Typography>
      {/* Show all services*/}

      <div className="allServices">
        {services.map((service, index) => (
          <ServiceItem key={index} service={service} />
        ))}
      </div>
    </StyledServicesSection>
  )
}

const StyledServicesSection = styled.section`
  padding: 6rem 2rem 8rem;
  max-width: 130rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  text-align: center;

  @media (min-width: 76.8rem) {
    padding: 6rem 0 8rem;
  }

  .allServices {
    display: flex;
    flex-wrap: wrap;
    padding: 3rem 0;
  }
`
