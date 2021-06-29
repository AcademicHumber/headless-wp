import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import { graphql } from "gatsby"
import { Business, WhatsApp, Send } from "@material-ui/icons"

export default function ContactInfo({
  data: { title, phoneData, emailData, addressData },
}) {
  const theme = useTheme()
  return (
    <SytledContactInfo theme={theme}>
      <Typography variant="h2" color="textPrimary">
        {title}
      </Typography>
      <div className="contactInfo">
        <div className="contactElement">
          <div className="contactIcon">
            <Business color="primary" />
          </div>

          <Typography variant="h4" color="textPrimary">
            {addressData.city}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {addressData.addres}
          </Typography>
        </div>
        <div className="contactElement">
          <div className="contactIcon">
            <WhatsApp color="primary" />
          </div>

          <Typography variant="h4" color="textPrimary">
            {addressData.city}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {addressData.addres}
          </Typography>
        </div>
        <div className="contactElement">
          <div className="contactIcon">
            <Send color="primary" />
          </div>

          <Typography variant="h4" color="textPrimary">
            {addressData.city}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {addressData.addres}
          </Typography>
        </div>
      </div>
    </SytledContactInfo>
  )
}

export const InfoSectionQuery = graphql`
  fragment ContactInfoSection on WpPage_Contactpagedata {
    contactInfo {
      title
      phoneData {
        phone
        description
      }
      emailData {
        email
        description
      }
      addressData {
        city
        addres
      }
    }
  }
`

const SytledContactInfo = styled.section.attrs(props => ({
  theme: props.theme,
}))`
  max-width: 130rem;
  margin: 0 auto;
  padding: 5rem 2rem;
  text-align: center;

  @media (min-width: 76.8rem) {
    padding: 8rem 0;
  }

  .contactInfo {
    padding: 8rem 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;

    .contactElement {
      display: flex;
      flex-direction: column;
      align-items: center;

      .contactIcon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;
        width: 120px;
        margin: 0 auto 2rem;
        border-radius: 50%;
        box-shadow: 0px 10px 25px 1px rgb(0 0 0 / 15%);

        svg {
          font-size: 4rem;
        }
      }
    }
  }
`
