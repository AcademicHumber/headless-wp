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
  categories.map(async category => {
    await createIndividualBlogPostsCategoryPage({
      posts,
      gatsbyUtilities,
      category,
      postsPerPage,
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
          return page === 1 ? `/` : `/blog/${page}`
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
 * This function creates all the individual category pages in this site
 */
const createIndividualBlogPostsCategoryPage = async ({
  posts,
  gatsbyUtilities,
  category,
  postsPerPage,
}) => {
  // Filter only the posts that has this category
  const categoryPosts = posts.filter(uniquePost => {
    postCategories = uniquePost.post.categories.nodes
    return postCategories.some(
      cat => JSON.stringify(cat) === JSON.stringify(category)
    )
  })

  const postsChunkedIntoArchivePages = chunk(categoryPosts, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

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

      const pagePath = `${category.uri + getPagePath(pageNumber)}`
      const nextPagePath = getPagePath(pageNumber + 1)
        ? `${category.uri + getPagePath(pageNumber + 1)}`
        : null

      // To prev page need a second validation in case getPagePath returns '' because
      // it will go trough false way
      const prevPagePath =
        getPagePath(pageNumber - 1) || getPagePath(pageNumber - 1) == ""
          ? `${category.uri + getPagePath(pageNumber - 1)}`
          : null

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/blog-post-categories.js`),
        context: {
          offset: index * postsPerPage,
          categoryId: category.id,
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
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
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
      `Ha habido un error cargando los posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpCategory.categories
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
