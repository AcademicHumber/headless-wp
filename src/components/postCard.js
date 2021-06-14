import React from "react"
import { Link } from "gatsby"
import parse from "html-react-parser"
import Image from "gatsby-image"
import { Card, Typography } from "@material-ui/core"
import styled from "styled-components"
import { StyledButton } from "../styles/components"
import { above } from "../styles/index"

export default function PostCard({ post }) {
  const title = post.title
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.alt || ``,
  }

  // Format date
  const postDate = new Date(post.date)
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  // Categories
  const postCategories = post.categories.nodes

  return (
    <>
      <StyledPostCard>
        {/* if we have a featured image for this post let's display it */}
        {featuredImage?.fluid && (
          <Link to={post.uri}>
            <Image fluid={featuredImage.fluid} alt={featuredImage.alt} />
          </Link>
        )}
        <section className="card-content">
          <div className="title-and-meta">
            <Typography variant="caption">
              {postDate.toLocaleDateString("es-ES", options)}
            </Typography>
            <Link to={post.uri} itemProp="url">
              <Typography color="textPrimary" variant="h4">
                {parse(title)}
              </Typography>
            </Link>
            {postCategories && (
              <div className="post-categories">
                {postCategories.map((category, index) => (
                  <>
                    {index == 0 ? "Categorías: " : ""}
                    <Link key={index} to={category.uri} itemProp="url">
                      <Typography variant="body2" component="span">
                        {category.name}
                      </Typography>
                    </Link>
                    {postCategories[index + 1] ? ", " : ""}
                  </>
                ))}
              </div>
            )}
          </div>
          {
            //post excerpt
          }
          <Typography
            variant="body1"
            component="div"
            color="secondary"
            itemProp="description"
          >
            {parse(post.excerpt)}
          </Typography>
        </section>
        {
          //Read More button
        }
        <StyledButton variant="outlined" color="primary" href={post.uri}>
          Leer Más
        </StyledButton>
      </StyledPostCard>
    </>
  )
}

const StyledPostCard = styled(Card)`
  min-width: 300px;
  width: 80%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: "2px 8px 24px 1px rgba(0,0,0,0.3)";
  border-radius: 30px;
  transition: all 0.3s ease;
  &:hover {
    transform: translate(-3px, -4px);
    box-shadow: 7px 9px 10px 1px rgba(0, 0, 0, 0.2);
  }
  ${above.medium`

  `}
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    max-height: 300px;
    background: #ccc;

    img {
      object-fit: contain !important;
    }
  }
  .card-content {
    padding: 20px;
  }
  .MuiButton-outlinedPrimary {
    margin: 10px 20px 40px;
  }
`
