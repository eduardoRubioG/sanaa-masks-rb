import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

// Might need to clear the cart here in this page  
const SecondPage = () => (
  <Layout pageInfo={{ pageName: "success" }}>
    <SEO title="success" />
    <h1>SUCCESS!</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
