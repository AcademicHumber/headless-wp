import React from "react"
import parse from "html-react-parser"
import { StyledHeader, StyledSocials } from "../../styles/styledHeader"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Toolbar, Typography } from "@material-ui/core"
import NavBar from "./navBar"
import SearchBar from "./searchBar"

export default function Header({ children }) {
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
      <StyledHeader>
        <Toolbar component="section" className="navigation-items">
          <section className="site-logo">
            <Link to="/">
              <Typography color="textPrimary" variant="h1">
                {parse(title)}
              </Typography>
            </Link>
          </section>
          <NavBar />
          <SearchBar />
        </Toolbar>

        {children}
      </StyledHeader>
    </>
  )
}
