import { Typography } from "@material-ui/core"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import StarIcon from "@material-ui/icons/Star"

export default function ReviewCard({ review }) {
  const { authorName, authorCompany, authorReview } = review

  const authorImage = {
    image: getImage(review.authorImage.localFile?.childImageSharp),
    altText: review.authorImage.altText,
  }
  return (
    <StyledReviewCard>
      <GatsbyImage
        className="reviewerImage"
        image={authorImage.image}
        alt={authorImage.altText}
      />
      <Typography variant="h4" color="textPrimary">
        {authorName}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {authorCompany}
      </Typography>
      <div className="stars">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>
      <Typography variant="body1" color="textSecondary">
        {authorReview}
      </Typography>
    </StyledReviewCard>
  )
}

const StyledReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 100%;
  padding: 4rem 2.5rem;
  box-shadow: 0px 1px 10px 2px rgb(0 0 0 / 15%);
  background: white;
  border-radius: 1rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 76.8rem) {
    flex-basis: 45%;
  }

  .reviewerImage {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);

    border-radius: 50%;
  }

  h4 {
    margin: 0.5rem;
  }

  .stars {
    margin: 1.5rem 0;
    svg {
      fill: #ffc100;
    }
  }
`
