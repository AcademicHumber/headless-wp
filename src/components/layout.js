import React from "react"
import { Container, StyledFooter } from "../styles/components"
import "../normalize.css"
import { lawyersTheme } from "../styles/themes"
import { ThemeProvider } from "@material-ui/core/styles"

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={lawyersTheme}>
      <Container>
        {children}
        <StyledFooter>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
          {` `}
          And <a href="https://wordpress.org/">WordPress</a>
        </StyledFooter>
      </Container>
    </ThemeProvider>
  )
}

export default Layout
