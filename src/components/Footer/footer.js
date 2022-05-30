import React from "react"
import LastPosts from "../widgets/LastPosts/lastPosts"
import Logo from "../logo"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StyledFooter } from "../../styles/styledFooter"
import { useTheme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import { AccessTime, LocationOn, Phone } from "@material-ui/icons"
import FooterNewsletter from "../NewsLetter/footerNewsletter"

export default function Footer() {
  const Texts = {
    openHours: "Lun - Vie: 8:00am a 5:00 pm",
    location: "Equipetrol, barrio braniff",
    phone: "(3) 333 4444",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ",
    placeholder: "Tu correo",
    beforeSuscriptionForm:
      "Recibe asesoría gratuita de la mejor firma de abogados",
    copyright: "© 2021 Abundia S.R.L. Todos los derechos reservados.",
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
          <div className="site-logo">
            <Link to="/">
              <Logo />
              <Typography variant="h4" color="textSecondary">
                {title}
              </Typography>
            </Link>
          </div>
          <div className="open-hours">
            <AccessTime color="secondary" />
            <Typography variant="body2" color="textSecondary">
              {Texts.openHours}
            </Typography>
          </div>
          <div className="location">
            <a
              href="https://www.google.com/maps/place/Equipetrol/@-17.7707486,-63.1964832,17z/data=!3m1!4b1!4m5!3m4!1s0x93f1e7fb788b0569:0x15933e0d841fb04b!8m2!3d-17.7706885!4d-63.194269"
              target="_blank"
              rel="noreferrer"
            >
              <LocationOn color="secondary" />
              <Typography variant="body2" color="textSecondary">
                {Texts.location}
              </Typography>
            </a>
          </div>
          <div className="phone">
            <a href={`tel:${Texts.phone}`}>
              <Phone color="secondary" />
              <Typography variant="body2" color="textSecondary">
                {Texts.phone}
              </Typography>
            </a>
          </div>
        </div>
        {/* Second Column */}
        <div className="about-info">
          <Typography variant="h4" color="textSecondary">
            Nosotros
          </Typography>
          <div className="about-text">
            <Typography variant="body2" color="textSecondary">
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
        <div className="footer-subscriptions">
          <Typography variant="h4" color="textSecondary">
            Suscripción
          </Typography>
          <div className="subscription-form">
            <Typography variant="body2" color="textSecondary">
              {Texts.beforeSuscriptionForm}
            </Typography>
            <FooterNewsletter Texts={Texts} />
          </div>
        </div>
      </section>
      <section className="copyright">
        <Typography variant="body2" color="textSecondary">
          {Texts.copyright}
        </Typography>
        &nbsp;
        <Link to="/blog">
          <Typography variant="body2" color="textSecondary">
            Terminos de privacidad
          </Typography>
        </Link>
        &nbsp;&nbsp;
        <a href="https://crm2.focoazul.com/" target="_blank" rel="noreferrer">
          <Typography variant="body2" color="textSecondary">
            Portal del cliente
          </Typography>
        </a>
      </section>
    </StyledFooter>
  )
}
