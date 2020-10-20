import React from "react"
import Container from 'react-bootstrap/Container';

// Components
import Layout from "../components/layout"
import Hero from "../components/Hero/hero";

import SEO from "../components/seo"

const IndexPage = () => (
  <Layout pageInfo={{ pageName: "index" }}>
    <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
    {/* <Container fluid className="text-center" style={{ border: `1px solid red`, height: `200px`, backgroundColor: `#FAE`, width: `100%`}}> */}
    <Hero />
    {/* </Container> */}
  </Layout>
)

export default IndexPage
