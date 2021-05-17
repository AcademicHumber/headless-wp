import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import SEO from "../components/seo"
import Header from "../components/Header/header"
import { StyledMainContentContainer } from "../styles/components"
import PostCard from "../components/postCard"
import { Typography } from "@material-ui/core"

const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes

  if (!posts.length) {
    return (
      <>
        <Header>Hola</Header>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </>
    )
  }

  return (
    <>
      <Header>
        <section className="hero">
          <Typography variant="h1" color="textPrimary">
            Encuentra las últimas noticias de tecnología{" "}
          </Typography>
          <Typography variant="caption"> Home - Blog</Typography>
        </section>
      </Header>
      <SEO title="Todas las publicaciones" />

      <StyledMainContentContainer>
        <section className="container">
          {posts.map(post => {
            return <PostCard key={post.uri} post={post} />
          })}
        </section>
      </StyledMainContentContainer>

      {previousPagePath && (
        <>
          <Link to={previousPagePath}>Previous page</Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                fluid(maxHeight: 350, quality: 100) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
