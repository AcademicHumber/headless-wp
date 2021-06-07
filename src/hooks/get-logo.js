import { useStaticQuery, graphql } from "gatsby"

export const useSiteLogo = () => {
  const {
    wp: { siteLogo },
  } = useStaticQuery(
    graphql`
      query GetLogo {
        wp {
          siteLogo {
            sourceUrl
            localFile {
              childImageSharp {
                fluid(maxWidth: 300, quality: 100) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
            altText
          }
        }
      }
    `
  )
  return siteLogo
}
