import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import SEO from "../components/seo"
import Header from "../components/Header/header"
import Footer from "../components/Footer/footer"
import { StyledMainContentContainer } from "../styles/components"
import PostCard from "../components/postCard"
import { Typography } from "@material-ui/core"
import NewsLetter from "../components/NewsLetter/newsletter"
import heroBackground from "../../content/assets/fondo-hero.png"

const BlogCategoryIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes
  const categoryName = data.wpCategory.name

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
      <Header background={heroBackground}>
        <section className="hero">
          <Typography variant="h1" color="textPrimary">
            Encuentra las últimas noticias
          </Typography>
          <Typography variant="caption">
            {" "}
            Home - Blog - Categoría: {categoryName}
          </Typography>
        </section>
      </Header>
      <SEO title={`Publicaciones de la categoría ${categoryName}`} />
      <StyledMainContentContainer>
        <section className="container">
          {posts.map(post => (
            <PostCard key={post.uri} post={post} />
          ))}
        </section>
        <div className="blog-post-nav">
          <div className="prev-post">
            {previousPagePath && (
              <Link to={previousPagePath} rel="prev">
                <Typography variant="caption" color="primary">
                  ← Posts siguentes
                </Typography>
              </Link>
            )}
          </div>
          <div className="next-post">
            {nextPagePath && (
              <Link to={nextPagePath} rel="next">
                <Typography variant="caption" color="primary">
                  Posts anteriores →
                </Typography>
              </Link>
            )}
          </div>
        </div>
      </StyledMainContentContainer>
      <NewsLetter />
      <Footer />
    </>
  )
}

export default BlogCategoryIndex

export const pageQuery = graphql`
  query WordPressPostArchivePerCategory(
    $offset: Int!
    $postsPerPage: Int!
    $taxonomyId: String!
  ) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
      filter: {
        categories: { nodes: { elemMatch: { id: { eq: $taxonomyId } } } }
      }
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        categories {
          nodes {
            id
            uri
            name
          }
        }
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(
                  height: 350
                  quality: 100
                  placeholder: TRACED_SVG
                )
              }
            }
          }
        }
      }
    }
    wpCategory(id: { eq: $taxonomyId }) {
      name
    }
  }
`
