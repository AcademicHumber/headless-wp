import { getImage } from "gatsby-plugin-image"

/**
 * Utilizes the function getImage from Gatsby-plugin-image to obtain the alt and the image attributes needed to use GatsbyImage component
 * You have to pass the object before localfile (commonly is the node element)
 * @returns object with image and alt if exist, if not, return false
 */
export const useImage = objectWithGatsbyImageAttributes => {
  const isImage =
    objectWithGatsbyImageAttributes?.localFile?.childImageSharp?.gatsbyImageData
  if (isImage) {
    const myImage = {
      image: getImage(isImage),
      altText: objectWithGatsbyImageAttributes.altText,
    }
    return myImage
  } else {
    return false
  }
}
