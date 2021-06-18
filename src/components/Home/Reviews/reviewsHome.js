import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import ReviewCard from "./reviewCard"

export default function ReviewsHome({ reviewsData }) {
  const { reviews } = reviewsData

  return (
    <StyledReviewsSection>
      <Typography variant="h2" color="textPrimary" className="HomeSubtitle">
        {reviewsData.reviewsTitle}
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        className="sectionDescription"
      >
        {reviewsData.reviewsDescription}
      </Typography>
      <div className="reviews">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review.reviewData} />
        ))}
      </div>
    </StyledReviewsSection>
  )
}

const StyledReviewsSection = styled.section`
  display: flex;
  justify-content: center;
  max-width: 130rem;
  margin: 0 auto;
  flex-direction: column;
  text-align: center;
  padding: 6rem 0 8rem;

  @media (max-width: 76.8rem) {
    padding: 3rem 2rem;
  }

  .HomeSubtitle {
    padding: 2rem 0;
  }
  .sectionDescription {
    max-width: 100rem;
    margin: 0 auto;
  }

  .reviews {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 6rem 0;
    gap: 6rem;

    @media (min-width: 110rem) {
      gap: none;
    }
  }
`

export const reviewsQuery = graphql`
  fragment ReviewsSectionData on WpPage_Homepagedata {
    reviews {
      reviewsTitle
      reviewsDescription
      reviews {
        ... on WpReview {
          reviewData {
            authorName
            authorCompany
            authorReview
            authorImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 100
                    placeholder: BLURRED
                    width: 100
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`
