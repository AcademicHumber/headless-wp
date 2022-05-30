import React, { useState, useRef, useEffect } from "react"
import { useOnClickOutside } from "../../hooks/menu-click-outside"
import parse from "html-react-parser"
import { StyledHeader } from "../../styles/styledHeader"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Toolbar, Typography } from "@material-ui/core"
import NavBar from "./navBar"
import Logo from "../logo"
import Burger from "./Menu/burger"
import Menu from "./Menu/menu"
import { StyledButton } from "../../styles/components"

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

  // Handle Hamburguer menu changes
  const [open, setOpen] = useState(false)
  // User click outside
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))

  // Sticky nav bar

  // const [sticky, setSticky] = useState(false)
  // const navRef = useRef(null)
  // const handleScroll = () => {
  //   if (navRef.current) {
  //     setSticky(navRef.current.getBoundingClientRect().top <= 0)
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll)
  //   return () => {
  //     window.removeEventListener("scroll", () => handleScroll)
  //   }
  // }, [])

  return (
    <>
      <StyledHeader background={`url(${background})`}>
        <div className={`menu ${sticky ? "sticky" : ""}`} ref={navRef}>
          <Toolbar component="section" className="navigation-items">
            <section className="site-logo">
              <Logo />
              <Link to="/">
                <Typography color="textPrimary" variant="h1">
                  {parse(title)}
                </Typography>
              </Link>
            </section>
            <NavBar />
            <StyledButton variant="outlined" color="primary" href="/contacto">
              Contactarse
            </StyledButton>
            <aside className="mobile-menu" ref={node}>
              <Burger open={open} setOpen={setOpen} />
              <Menu open={open} setOpen={setOpen} title={title} />
            </aside>
          </Toolbar>
        </div>

        {children}
      </StyledHeader>
    </>
  )
}
