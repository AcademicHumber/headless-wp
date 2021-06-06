import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import _ from "lodash"
import PostItem from "./postItem"

export default function LastPosts({ quantity }) {
  const {
    allWpPost: { nodes: posts },
  } = useStaticQuery(graphql`
    query Posts {
      allWpPost(limit: 5) {
        nodes {
          title
          date(formatString: "MMMM DD, YYYY")
          uri
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  fluid(maxHeight: 100, quality: 100) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <StyledWidget>
        {_.times(quantity, index => (
          <PostItem key={index} post={posts[index]} />
        ))}
      </StyledWidget>
    </>
  )
}

const StyledWidget = styled.section`
  display: flex;
  flex-direction: column;

  & .widget-post-item {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 0.2fr;
    padding: 1rem 0;

    .post_item_image {
      grid-column: 1/2;
      grid-row: 1/-1;
      margin-right: 1rem;

      .gatsby-image-wrapper {
        border-radius: 1.5rem;
        box-shadow: 0px 1px 3px 2px rgba(0, 0, 0, 0.3);
        width: 8rem;
        height: 8rem;
        text-align: center;
      }
    }

    .post_item_title {
      grid-column: 2/3;
      grid-row: 1/2;
      h6 {
        font-size: 1.4rem;
      }
    }

    &:hover {
      opacity: 0.9;
    }
  }
`
