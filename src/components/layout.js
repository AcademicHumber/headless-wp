import React from "react"
import { Container } from "../styles/components"
import "../normalize.css"
import { lawyersTheme } from "../styles/themes"
import { ThemeProvider } from "@material-ui/core/styles"
import { MainProvider } from "../context/main-context"

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={lawyersTheme}>
      <MainProvider>
        <Container>{children}</Container>
      </MainProvider>
    </ThemeProvider>
  )
}

export default Layout
