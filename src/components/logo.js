import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useSiteLogo } from "../hooks/get-logo"

export default function Logo() {
  //get logo
  const siteLogo = useSiteLogo()

  if (siteLogo != null) {
    const logoImg = {
      image: siteLogo.localFile?.childImageSharp?.gatsbyImageData,
      alt: siteLogo.altText || ``,
    }
    return (
      <GatsbyImage
        image={logoImg.image}
        alt={logoImg.alt}
        className="logo-image"
        objectFit="contain"
      />
    )
  } else {
    return <div></div>
  }
}
