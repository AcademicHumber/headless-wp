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
                gatsbyImageData(
                  width: 50
                  quality: 100
                  placeholder: TRACED_SVG
                )
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
