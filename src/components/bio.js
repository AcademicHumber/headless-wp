/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Typography } from "@material-ui/core"

const Bio = () => {
  const { author } = useStaticQuery(
    graphql`
      query BioQuery {
        # if there was more than one user, this would need to be filtered
        author: wpUser {
          firstName
          lastName
          twitter: name
          description
          avatar {
            url
          }
        }
      }
    `
  )

  const avatarUrl = author?.avatar?.url
  return (
    <>
      {avatarUrl && (
        <img
          alt={author?.firstName || ``}
          className="bio-avatar"
          src={avatarUrl}
        />
      )}
      {author?.firstName && (
        <div className="author-data">
          <Typography variant="h5" color="textSecondary">
            Escrito por{" "}
            <strong>
              {author.firstName} {author.lastName}
            </strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {author?.description || null}
          </Typography>
        </div>
      )}
    </>
  )
}

export default Bio
