/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Navbar from "./navBar"

import { socialMediaHandles } from "../components/content"

const Layout = ({ children, pageInfo }) => {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line global-require
    require("smooth-scroll")('a[href*="#"]', {
      speed: 300,
      topOnEmptyHash: true,
      easing: "linear",
    })
  }
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Container fluid className="px-0 main">
            <Navbar pageInfo={pageInfo} />
            <main style={{ height: `100%`, backgroundColor: `#FEFAE0` }}>
              {children}
            </main>
          </Container>
          <Container fluid className="px-0">
            <Row noGutters>
              <Col className="footer-col">
                <footer style={{ backgroundColor: `#283618` }}>
                  <div className="footer-col__content">
                    <p>
                      <span className="footer-col__content-emph">Masks</span> by
                      Sanaa
                    </p>
                    <div className="footer-col__link-container">
                      <Link className="footer-col__link-container--link" to="/#">Home</Link>
                      {' | '}
                      <Link className="footer-col__link-container--link" to="/#about-section">About</Link>
                      {' | '}
                      <a className="footer-col__link-container--link" href={socialMediaHandles.instagram}>Instagram</a>
                    </div>
                  </div>
                  {/* <span>
                    © {new Date().getFullYear()}, Built with
                    {` `}
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                  </span> */}
                </footer>
              </Col>
            </Row>
          </Container>
        </>
      )}
    />
  )
}

export default Layout
