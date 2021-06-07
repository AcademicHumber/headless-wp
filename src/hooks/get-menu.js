import { useStaticQuery, graphql } from "gatsby"

export const useMenu = () => {
  const { allWpMenuItem: menuQuery } = useStaticQuery(graphql`
    query MenuQuery {
      #Menu Query
      allWpMenuItem(filter: { locations: { eq: GATSBY_HEADER_MENU } }) {
        #menuItems(where: { location: GATSBY_FOOTER_MENU }) {
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
  // Order the recieved menu
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

  return orderedMenu
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
