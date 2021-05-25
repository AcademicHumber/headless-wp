import React from "react"
import { StyledFooter } from "../../styles/components"

export default function Footer() {
  return (
    <StyledFooter>
      © {new Date().getFullYear()}, desarrollado por
      {` `}
      <a href="https://focoazul.com">Foco Azul</a>
    </StyledFooter>
  )
}
