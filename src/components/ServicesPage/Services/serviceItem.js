import React from "react"
import BookmarksIcon from "@material-ui/icons/Bookmarks"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import parse from "html-react-parser"
import { Link } from "gatsby"

export default function ServiceItem({ service: { title, excerpt, uri } }) {
  return (
    <StyledServiceItem className="serviceItem">
      <Link to={uri}>
        <BookmarksIcon color="primary" />
        <Typography variant="h4" color="textPrimary" className="serviceName">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="serviceDescription"
          component="div"
        >
          {parse(excerpt)}
        </Typography>
      </Link>
    </StyledServiceItem>
  )
}

const StyledServiceItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 1rem 2rem;
  flex-basis: 100%;

  @media (min-width: 76.8rem) {
    flex-basis: 25%;
  }

  h4 {
    margin: 1.5rem 0;
  }
`
