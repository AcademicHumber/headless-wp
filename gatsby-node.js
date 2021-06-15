const path = require(`path`)
const chunk = require(`lodash/chunk`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our posts from the GraphQL server
  const posts = await getPosts(gatsbyUtilities)

  // Query for categories from the GraphQL server
  const categories = await getCategories(gatsbyUtilities)

  // Query for tags from the GraphQL server
  const tags = await getTags(gatsbyUtilities)

  // Query for the postsPerPage
  const { postsPerPage } = await getPostsPerPage(gatsbyUtilities)

  // If there are no posts in WordPress, don't do anything
  if (!posts.length) {
    return
  }

  // If there are posts, create pages for them
  await createIndividualBlogPostPages({ posts, gatsbyUtilities })

  // And a paginated archive
  await createBlogPostArchive({ posts, gatsbyUtilities, postsPerPage })

  //Create Categories pages

  const categoriesTaxonomy = "category"
  categories.map(async category => {
    await createIndividualBlogPostsTaxonomyPage({
      posts,
      gatsbyUtilities,
      taxonomy: category,
      postsPerPage,
      taxonomyName: "category",
    })
  })

  // Create tags pages
  const tagsTaxonomy = "tag"
  tags.map(async tag => {
    await createIndividualBlogPostsTaxonomyPage({
      posts,
      gatsbyUtilities,
      taxonomy: tag,
      postsPerPage,
      taxonomyName: "tag",
    })
  })
}

/**
 * This function creates all the individual blog post pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: post.uri,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/blog-post.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

/**
 * This function creates all the individual blog pages in this site
 */
async function createBlogPostArchive({ posts, gatsbyUtilities, postsPerPage }) {
  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? `/blog/` : `/blog/${page}`
        }

        return null
      }

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/blog-post-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
}

/**
 * This function creates all the individual taxonomy pages in this site
 */
const createIndividualBlogPostsTaxonomyPage = async ({
  posts,
  gatsbyUtilities,
  taxonomy,
  postsPerPage,
  taxonomyName,
}) => {
  // Filter only the posts that has this taxonomy
  const taxonomyPosts = posts.filter(uniquePost => {
    // We have to determine whether it is category or tags
    switch (taxonomyName) {
      case "category":
        postTaxonomies = uniquePost.post.categories.nodes
        // Determines if this post has the current taxonomy
        return postTaxonomies.some(
          tax => JSON.stringify(tax) === JSON.stringify(taxonomy)
        )

      case "tag":
        postTaxonomies = uniquePost.post.tags.nodes
        return postTaxonomies.some(
          tax => JSON.stringify(tax) === JSON.stringify(taxonomy)
        )
      default:
        console.log(`neither reached at ${taxonomyName}`)
        return false
    }
  })

  const postsChunkedIntoArchivePages = chunk(taxonomyPosts, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  const templatePath = `./src/templates/blog-post-${taxonomyName}.js`

  Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Want the second page ahead to be numbered.
          // "/categoria/adquisiciones/2" for example
          return page === 1 ? `` : `${page}`
        }

        return null
      }

      const pagePath = `${taxonomy.uri + getPagePath(pageNumber)}`
      const nextPagePath = getPagePath(pageNumber + 1)
        ? `${taxonomy.uri + getPagePath(pageNumber + 1)}`
        : null

      // To prev page need a second validation in case getPagePath returns '' because
      // it will go trough false way
      const prevPagePath =
        getPagePath(pageNumber - 1) || getPagePath(pageNumber - 1) == ""
          ? `${taxonomy.uri + getPagePath(pageNumber - 1)}`
          : null

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: pagePath,
        component: path.resolve(templatePath),
        context: {
          offset: index * postsPerPage,
          taxonomyId: taxonomy.id,
          postsPerPage,
          nextPagePath: nextPagePath,
          previousPagePath: prevPagePath,
        },
      })
    })
  )
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }

          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
            # Ask for post tags
            tags {
              nodes {
                id
                uri
              }
            }
            # Ask for post categories
            categories {
              nodes {
                id
                uri
              }
            }
          }

          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress categories.
 */
async function getCategories({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query GetCategories {
      allWpCategory {
        categories: nodes {
          id
          uri
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `Ha habido un error cargando las categorías`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpCategory.categories
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress tags.
 */
async function getTags({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query GetTags {
      allWpTag {
        tags: nodes {
          id
          uri
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `Ha habido un error cargando las etiquetas`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpTag.tags
}

/* Funtion to get postPerPage */

async function getPostsPerPage({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `Ha habido un error cargando los posts por página`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.wp.readingSettings
}
