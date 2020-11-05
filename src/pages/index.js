import React from "react"
import { graphql } from "gatsby"

// Components
import Layout from "../components/layout"
import Hero from "../components/Hero/hero"
import About from "../components/About/About"
import MaskSection from "../components/MaskSection/MaskSection"

import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout pageInfo={{ pageName: "index" }}>
    <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
    <Hero />
    <About />
    <MaskSection
      priceData={data.allStripePrice}
      productData={data.allStripeProduct}
    />
  </Layout>
)

export const query = graphql`
  query productQuery {
    allStripePrice {
      edges {
        node {
          id
          product {
            name
            metadata {
              type
            }
          }
          unit_amount
        }
      }
    }
    allStripeProduct {
      edges {
        node {
          id
          name
          localFiles {
            childImageSharp {
              id
              fixed(width: 400) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
