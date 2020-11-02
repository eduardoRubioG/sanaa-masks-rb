import React from "react"

// Components
import Layout from "../components/layout"
import Hero from "../components/Hero/hero";
import About from "../components/About/About";
import MaskSection from "../components/MaskSection/MaskSection";

import SEO from "../components/seo"

const IndexPage = () => (
  <Layout pageInfo={{ pageName: "index" }}>
    <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
    <Hero />
    <About />
    <MaskSection />
  </Layout>
)

export default IndexPage
