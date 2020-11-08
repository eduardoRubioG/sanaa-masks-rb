import React from "react"
import { useStaticQuery } from "gatsby"
import Button from "react-bootstrap/Button"
import Img from "gatsby-image"

import Layout from "../components/layout"
import "../styles/success.scss"
import SEO from "../components/seo"

// Might need to clear the cart here in this page
const SecondPage = () => {
  const data = useStaticQuery(graphql`
  query SuccessQuery {
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        name: { eq: "ThankYou" }
      }
    ) {
      nodes {
        id
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`)
  return (
    <Layout pageInfo={{ pageName: "success" }}>
      <div className="success">
        <Img fluid={data.allFile.nodes[0].childImageSharp.fluid} />
        <div className="success__msg">
          <p>Your masks will be mailed shortly!</p>
        </div>
      </div>
    </Layout>
  )
}

export default SecondPage
