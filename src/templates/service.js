import { graphql } from "gatsby"
import React from "react"
import Header from "../components/Header/header"

export default function service({ data: { previous, next, service } }) {
  console.log(next, service, previous)
  return <Header></Header>
}

export const serviceQuery = graphql`
  query serviceById(
    $id: String!
    $previousServiceId: String
    $nextServiceId: String
  ) {
    service: wpServicio(id: { eq: $id }) {
      datosSobreElServicio {
        serviceName
        informacionDelServicio
        areaKnowledge
      }
    }
    previous: wpServicio(id: { eq: $previousServiceId }) {
      uri
      title
    }
    next: wpServicio(id: { eq: $nextServiceId }) {
      uri
      title
    }
  }
`
