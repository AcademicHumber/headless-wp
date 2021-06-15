import React from "react"
import SEO from "../components/seo"
import Header from "../components/Header/header"
import HomeHeroBg from "../../content/assets/home-hero-background.png"

export default function HomePage() {
  return (
    <>
      <Header background={HomeHeroBg}></Header>
      <SEO />
    </>
  )
}
