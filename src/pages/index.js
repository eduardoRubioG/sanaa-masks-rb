import React from "react"
import { graphql } from "gatsby"
import { loadStripe } from "@stripe/stripe-js"
import { CartProvider } from "use-shopping-cart"

// Components
import Layout from "../components/layout"
import Hero from "../components/Hero/hero"
import About from "../components/About/About"
import MaskSection from "../components/MaskSection/MaskSection"
import Cart from "../components/Cart/Cart"

import SEO from "../components/seo"

const stripePromise = loadStripe(process.env.STRIPE_PUB_KEY)
const IndexPage = ({ data }) => (
  <CartProvider
    mode="client-only"
    stripe={stripePromise}
    successUrl={`${process.env.ROOT_URL}/success`}
    cancelUrl={`${process.env.ROOT_URL}/#`}
    currency="USD"
    allowedCountries={["US"]}
    billingAddressCollection={true}
  >
    <Layout pageInfo={{ pageName: "index" }}>
      <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />

      <section id="hero-section">
        <Hero />
      </section>

      <section>
        <About />
      </section>
      
      <section>
        <MaskSection
          id="mask-section"
          priceData={data.allStripePrice}
          productData={data.allStripeProduct}
        />
        <Cart />
      </section>
    </Layout>
  </CartProvider>
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
