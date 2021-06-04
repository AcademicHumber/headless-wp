import React from "react"
import LastPosts from "../widgets/lastPosts"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StyledFooter } from "../../styles/styledFooter"
import { useTheme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import { AccessTime, LocationOn, Phone } from "@material-ui/icons"
import NewsletterForm from "../NewsLetter/newsletterForm"
import FooterNewsletter from "../NewsLetter/footerNewsletter"

export default function Footer() {
  const Texts = {
    openHours: "Lun - Vie: 8:00am a 5:00 pm",
    location: "Equipetrol, barrio braniff",
    phone: "3 3334444",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ",
    placeholder: "Tu correo",
  }

  const theme = useTheme()

  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query siteInfoQuery {
      #Site info query
      wp {
        generalSettings {
          title
        }
      }
    }
  `)

  return (
    <StyledFooter background={theme.palette.primary.dark} s>
      <section className="footer-container">
        {/* First Column */}
        <div className="site-info">
          <Typography variant="h4" color="textSecondary">
            {title}
          </Typography>
          <div className="open-hours">
            <AccessTime color="secondary" />
            <Typography variant="p" color="textSecondary">
              {Texts.openHours}
            </Typography>
          </div>
          <div className="location">
            <LocationOn color="secondary" />
            <Typography variant="p" color="textSecondary">
              {Texts.location}
            </Typography>
          </div>
          <div className="phone">
            <Phone color="secondary" />
            <Typography variant="p" color="textSecondary">
              {Texts.phone}
            </Typography>
          </div>
        </div>
        {/* Second Column */}
        <div className="about-info">
          <Typography variant="h4" color="textSecondary">
            Nosotros
          </Typography>
          <div className="about-text">
            <Typography variant="p" color="textSecondary">
              {Texts.about}
            </Typography>
          </div>
        </div>
        {/* Third Column */}
        <div className="last-posts">
          <Typography variant="h4" color="textSecondary">
            Últimas publicaciones
          </Typography>
          <LastPosts quantity="2" />
        </div>
        {/* Fourth Column */}
        <div className="last-posts">
          <Typography variant="h4" color="textSecondary">
            Suscripción
          </Typography>
          <FooterNewsletter Texts={Texts} />
        </div>
      </section>
    </StyledFooter>
  )
}
