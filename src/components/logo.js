import React from "react"
import Image from "gatsby-image"
import { useSiteLogo } from "../hooks/get-logo"

export default function Logo() {
  //get logo
  const siteLogo = useSiteLogo()

  if (siteLogo != null) {
    const logoImg = {
      fluid: siteLogo.localFile?.childImageSharp?.fluid,
      alt: siteLogo.altText || ``,
    }
    return (
      <Image fluid={logoImg.fluid} alt={logoImg.alt} className="logo-image" />
    )
  } else {
    return <div></div>
  }
}
