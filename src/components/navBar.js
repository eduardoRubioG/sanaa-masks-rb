import React, { useState } from "react"
import { Link } from "gatsby"

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

import "./navBar.scss"

const CustomNavbar = ({ pageInfo }) => {
  const [expanded, setExpanded] = useState(false);
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
        <Link to="/" className="link-no-style">
          <Navbar.Brand as="span" style={{ color: `#FEFAE0`}}>Masks by Sanaa</Navbar.Brand>
        </Link>

        {/* The hamburger menu  */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>

        {/* The drop down link menu on mobile  */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            variant="pills"
            className="ml-auto"
            activeKey={pageInfo && pageInfo.pageName}
            defaultActiveKey="/buy"
          >
              <Nav.Link href="#hero-section" eventKey="home" style={{ fontWeight: `300`}} onClick={() => setExpanded(false)}>
                HOME
              </Nav.Link>
              <Nav.Link href="#about-section" eventKey="about" style={{ fontWeight: `300`}} onClick={() => setExpanded(false)}>
                ABOUT
              </Nav.Link>
              <Nav.Link href="#mask-section" eventKey="buy" style={{ fontWeight: `300`}} onClick={() => setExpanded(false)}>
                BUY MASK
              </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default CustomNavbar
