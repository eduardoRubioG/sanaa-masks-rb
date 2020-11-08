import React, { useState } from "react"
import { Link } from "gatsby"

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

import "./navBar.scss"

const CustomNavbar = ({ pageInfo }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <Navbar
        variant="dark"
        bg="dark-green"
        expand="lg"
        id="site-navbar"
        fixed="top"
        expanded={expanded}
      >
        {/* <Container> */}
        <Link to="/" className="link-no-style">
          <Navbar.Brand as="span">
            <span className="navbar__brand-text">
              <span className="navbar__brand-text--emph">Masks</span> by Sanaa
            </span>
          </Navbar.Brand>
        </Link>

        {/* The hamburger menu  */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />

        {/* The drop down link menu on mobile  */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            variant="pills"
            className="ml-auto"
            activeKey={pageInfo && pageInfo.pageName}
            defaultActiveKey="/buy"
          >
            <Link
              to="/#"
              className="link-no-style"
              style={{ marginRight: `1rem` }}
              onClick={() =>
                setTimeout(() => {
                  setExpanded(false)
                }, 150)
              }
            >
              <Nav.Link as="span" eventKey="buy" style={{ fontWeight: `300` }}>
                HOME
              </Nav.Link>
            </Link>
            <Link
              to="/#about-section"
              className="link-no-style"
              style={{ marginRight: `1rem` }}
              onClick={() =>
                setTimeout(() => {
                  setExpanded(false)
                }, 150)
              }
            >
              <Nav.Link
                as="span"
                eventKey="about"
                style={{ fontWeight: `300` }}
              >
                ABOUT
              </Nav.Link>
            </Link>
            <Link
              to="/#mask-section"
              className="link-no-style"
              style={{ marginRight: `1rem` }}
              onClick={() =>
                setTimeout(() => {
                  setExpanded(false)
                }, 150)
              }
            >
              <Nav.Link
                as="span"
                eventKey="about"
                style={{ fontWeight: `300` }}
              >
                BUY MASK
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  )
}

export default CustomNavbar
