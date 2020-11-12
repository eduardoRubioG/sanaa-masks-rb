import React, { useEffect } from "react"
import { useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import "../styles/success.scss"
import { useShoppingCart } from "use-shopping-cart";

// Might need to clear the cart here in this page
const SecondPage = () => {
  const { clearCart } = useShoppingCart(); 
  useEffect(() => {
    clearCart();
    sessionStorage.clear('cart-values');
    localStorage.clear('cart-values');
  },[clearCart]);
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
        <div className="success__img-container">
          <Img className="success__img" fluid={data.allFile.nodes[0].childImageSharp.fluid} />
        </div>
        <div className="success__msg">
          <p>Your masks will be mailed shortly!</p>
        </div>
      </div>
    </Layout>
  )
}

export default SecondPage
