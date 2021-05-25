import React from "react"
import { Container } from "../styles/components"
import "../normalize.css"
import { lawyersTheme } from "../styles/themes"
import { ThemeProvider } from "@material-ui/core/styles"

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={lawyersTheme}>
      <Container>{children}</Container>
    </ThemeProvider>
  )
}

export default Layout
