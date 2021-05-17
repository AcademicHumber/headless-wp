import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StyledMenu } from "../../styles/styledHeader"
import MenuChildren from "./menuChildren"

export default function NavBar() {
  const { allWpMenuItem: menuQuery } = useStaticQuery(graphql`
    query MenuQuery {
      #Menu Query
      allWpMenuItem(filter: { locations: { eq: GATSBY_HEADER_MENU } }) {
        nodes {
          id
          label
          title
          path
          parentId
          order
        }
      }
    }
  `)

  const menu = menuQuery.nodes.sort(function (a, b) {
    if (a.order > b.order) {
      return 1
    }
    if (a.order < b.order) {
      return -1
    }
    // a must be equal to b
    return 0
  })

  const orderedMenu = flatListToHierarchical(menu)

  return (
    <StyledMenu>
      {orderedMenu.map((menuItem, index) => {
        if (!menuItem.children.length) {
          return (
            <div className="menu-item" key={menuItem.id}>
              <Link to={menuItem.path}>{menuItem.label}</Link>
            </div>
          )
        } else {
          return (
            <div className="menu-item" key={menuItem.id}>
              <Link to={menuItem.path}>{menuItem.label}</Link>
              <MenuChildren key={index} child={menuItem.children} />
            </div>
          )
        }
      })}
    </StyledMenu>
  )
}

// Function to order the menu items
const flatListToHierarchical = (
  data = [],
  { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
) => {
  const tree = []
  const childrenOf = {}
  data.forEach(item => {
    const newItem = { ...item }
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
    childrenOf[id] = childrenOf[id] || []
    newItem[childrenKey] = childrenOf[id]
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem)
  })
  return tree
}
