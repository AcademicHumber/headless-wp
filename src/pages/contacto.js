import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Footer from "../components/Footer/footer"
import Header from "../components/Header/header"
import ReviewsSection from "../components/Home/Reviews/reviewsSection"
import { Typography } from "@material-ui/core"
import heroBackground from "../../content/assets/fondo-hero.png"
import styled from "styled-components"
import Cta from "../components/cta"
import Seo from "../components/seo"
import ContactSection from "../components/ContactPage/contactForm/contactSection"
import Faq from "../components/ContactPage/FaqSection/faq"
import ContactInfo from "../components/ContactPage/contactInfo/contactInfo"

export default function Contacto() {
  const {
    wpPage: { title, contactPageData },
    allWpFaq: { questions },
  } = useStaticQuery(graphql`
    query contactPageData {
      wpPage(slug: { eq: "contacto" }) {
        title
        contactPageData {
          # Hero title
          title

          # Contact Form Section
          contactForm {
            title
            descripcion
            formIntructions
          }

          # Contact Info Section
          ...ContactInfoSection

          # Reviews Section

          ...ContactReviewsSectionData

          # Faqs Texts
          faqsData {
            title
            buttonText
            buttonUri {
              ... on WpPage {
                id
                uri
              }
            }
            afterFaqs
          }

          # Cta

          contactCallToAction {
            # Change the name for the cta component
            ctaTitle: ctatitle
            ctaButtonUri {
              ... on WpPage {
                uri
              }
            }
            ctaButtonText
          }
        }
      }

      # Get all faqs
      allWpFaq {
        questions: nodes {
          title
          content
          slug
        }
      }
    }
  `)

  return (
    <StyledContactPage>
      <Header currentMenuPage="Servicios" background={heroBackground}>
        <section className="hero">
          <Typography variant="h1" color="textPrimary">
            {contactPageData.title}
          </Typography>
          <Typography variant="caption"> Home - Contacto</Typography>
        </section>
      </Header>
      <Seo title={title} />
      <ContactSection data={contactPageData.contactForm} />
      <ContactInfo data={contactPageData.contactInfo} />
      <section className="contactReviews">
        <ReviewsSection reviewsData={contactPageData.reviewsData} />
      </section>
      <Faq data={contactPageData.faqsData} questions={questions} />
      <Cta data={contactPageData.contactCallToAction} />

      <Footer />
    </StyledContactPage>
  )
}

const StyledContactPage = styled.section`
  // Normalize subtitles
  h2 {
    max-width: 85rem;
    margin: 0 auto;
  }
  .contactReviews {
    background-color: #ebebeb5e;
  }
`
