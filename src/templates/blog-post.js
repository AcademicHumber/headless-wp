import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"
import heroBackground from "../../content/assets/fondo-hero.png"
import Bio from "../components/bio"
import SEO from "../components/seo"
import Header from "../components/Header/header"
import { Typography } from "@material-ui/core"
import { StyledMainSingleContentContainer } from "../styles/components"
import NewsLetter from "../components/NewsLetter/newsletter"
import Footer from "../components/Footer/footer"
import LastPosts from "../components/widgets/LastPosts/lastPosts"
import { useTheme } from "@material-ui/core/styles"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
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

  // Get categories and tags
  const postCategories = post.categories.nodes
  const postTags = post.tags.nodes

  // Get theme
  const theme = useTheme()
  return (
    <>
      <Header background={heroBackground}>
        <section className="hero">
          <Typography variant="h1" color="textPrimary">
            Encuentra las últimas noticias
          </Typography>
          <Typography variant="caption"> Home → {parse(post.title)}</Typography>
        </section>
      </Header>
      <SEO title={post.title} description={post.excerpt} />
      <StyledMainSingleContentContainer theme={theme}>
        <section className="container">
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            {/* if we have a featured image for this post let's display it */}
            {featuredImage?.fluid && (
              <Image
                fluid={featuredImage.fluid}
                alt={featuredImage.alt}
                className="post-image"
              />
            )}
            <Typography
              variant="caption"
              color="textSecondary"
              className="post-date"
            >
              {postDate.toLocaleDateString("es-ES", options)}
            </Typography>
            {postCategories.length !== 0 && (
              <div className="post-categories">
                {postCategories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.uri}
                    itemProp="url"
                    className="postCategory"
                  >
                    <Typography variant="body2" component="span">
                      {category.name}
                    </Typography>
                  </Link>
                ))}
              </div>
            )}
            <Typography variant="h2" color="textPrimary" className="post-title">
              {parse(post.title)}
            </Typography>

            <section className="author">
              <Bio />
            </section>
            {!!post.content && (
              <Typography
                variant="body1"
                component="section"
                color="textPrimary"
                className="post-content"
              >
                {parse(post.content)}
              </Typography>
            )}

            {postTags.length !== 0 && (
              <>
                <hr />
                <div className="post-tags">
                  {postTags.map((tag, index) => (
                    <>
                      {index === 0 ? (
                        <Typography
                          variant="h5"
                          color="textPrimary"
                          className="postTagsTitle"
                        >
                          Etiquetas del post:{" "}
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Link
                        key={tag.uri}
                        to={tag.uri}
                        itemProp="url"
                        className="postTag"
                      >
                        <Typography variant="body2" component="span">
                          {`#${tag.name}`}
                        </Typography>
                      </Link>
                    </>
                  ))}
                </div>
              </>
            )}
            <hr />
          </article>
          <div className="blog-post-nav">
            <div className="prev-post">
              {previous && (
                <Link to={previous.uri} rel="prev">
                  <Typography variant="caption" color="primary">
                    ← {parse(previous.title)}
                  </Typography>
                </Link>
              )}
            </div>
            <div className="next-post">
              {next && (
                <Link to={next.uri} rel="next">
                  <Typography variant="caption" color="primary">
                    {parse(next.title)} →
                  </Typography>
                </Link>
              )}
            </div>
          </div>
          <aside className="sidebar">
            <Typography
              variant="h3"
              color="textPrimary"
              className="widget-title"
            >
              Últimas publicaciones
            </Typography>
            <LastPosts quantity="4" />
          </aside>
        </section>
      </StyledMainSingleContentContainer>
      <NewsLetter />
      <Footer />
    </>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "DD MMMM, YYYY")

      #Query for categories
      categories {
        nodes {
          id
          uri
          name
        }
      }

      #Query for tags
      tags {
        nodes {
          id
          uri
          name
        }
      }

      #Query for featured image data
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
