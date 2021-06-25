import React from "react"
import { Link } from "gatsby"
import { StyledMenu } from "../../styles/styledHeader"
import MenuChildren from "./menuChildren"
import { useMenu } from "../../hooks/get-menu"
import { useTheme } from "@material-ui/styles"

export default function NavBar() {
  const orderedMenu = useMenu()

  const theme = useTheme()

  return (
    <StyledMenu className="desktop-menu" theme={theme}>
      {orderedMenu.map((menuItem, index) => {
        if (!menuItem.children.length) {
          return (
            <div className="menu-item" key={menuItem.id}>
              <Link
                to={menuItem.path}
                activeClassName="active"
                partiallyActive={menuItem.path !== "/"}
              >
                {menuItem.label}
              </Link>
            </div>
          )
        } else {
          return (
            <div className="menu-item" key={menuItem.id}>
              <Link
                to={menuItem.path}
                activeClassName="active"
                partiallyActive={true}
              >
                {menuItem.label}
              </Link>
              <MenuChildren key={index} child={menuItem.children} />
            </div>
          )
        }
      })}
    </StyledMenu>
  )
}
