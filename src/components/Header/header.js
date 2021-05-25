import React from "react"
import parse from "html-react-parser"
import { StyledHeader } from "../../styles/styledHeader"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Toolbar, Typography } from "@material-ui/core"
import NavBar from "./navBar"

export default function Header({ children, background }) {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      #Site info query
      wp {
        generalSettings {
          title
        }
      }
    }
  `)

  return (
    <>
      <StyledHeader background={`url(${background})`}>
        <Toolbar component="section" className="navigation-items">
          <section className="site-logo">
            <Link to="/">
              <Typography color="textPrimary" variant="h1">
                {parse(title)}
              </Typography>
            </Link>
          </section>
          <NavBar />
        </Toolbar>

        {children}
      </StyledHeader>
    </>
  )
}
