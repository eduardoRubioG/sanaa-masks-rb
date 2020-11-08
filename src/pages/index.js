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
// const stripePromise = loadStripe('pk_test_51HjBs5Dj5VI0xmgcMQtuC981DUXeEMWRj4UWkLqXTVH7SZtN6J7oLxfKJGT2HaCxg6QS2ktHPpoafxvM5bqp64Cf00ipVRhpN9');
const IndexPage = ({ data }) => (
  <CartProvider
    mode="client-only"
    stripe={stripePromise}
    successUrl={`${process.env.ROOT_URL}/success`}
    cancelUrl={`${process.env.ROOT_URL}/cancel`}
    currency="USD"
    allowedCountries={["US"]}
    billingAddressCollection={true}
  >
    <Layout pageInfo={{ pageName: "index" }}>
      <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />

      <section id="hero-section">
        <Hero />
      </section>

      <section id="about-section">
        <About />
      </section>

      <section id="mask-section">
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
