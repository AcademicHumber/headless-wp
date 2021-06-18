import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Typography } from "@material-ui/core"

export default function Recognition({ data }) {
  const recognitionImage = {
    image: getImage(data.image.localFile.childImageSharp.gatsbyImageData),
    altText: data.image.altText,
  }

  const { title, description } = data
  return (
    <div className="recognition">
      <div className="recognitionImage">
        <GatsbyImage
          image={recognitionImage.image}
          alt={recognitionImage.altText}
        />
      </div>
      <Typography variant="h4" color="textPrimary">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </div>
  )
}
