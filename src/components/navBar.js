import React from "react"
import { Link } from "gatsby"

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

import "./navBar.scss"

const CustomNavbar = ({ pageInfo }) => {
  return (
    <>
      <Navbar
        variant="dark"
        bg="dark-green"
        expand="lg"
        id="site-navbar"
        fixed="top"
      >
        {/* <Container> */}
        <Link to="/" className="link-no-style">
          <Navbar.Brand as="span" style={{ color: `#FEFAE0`}}>Masks by Sanaa</Navbar.Brand>
        </Link>

        {/* The hamburger menu  */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

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
            >
              <Nav.Link as="span" eventKey="buy" style={{ fontWeight: `300`}}>
                HOME
              </Nav.Link>
            </Link>
            <Link
              to="/#"
              className="link-no-style"
              style={{ marginRight: `1rem` }}
            >
              <Nav.Link as="span" eventKey="about" style={{ fontWeight: `300`}}>
                ABOUT
              </Nav.Link>
            </Link>
            <button className="nav-btn-custom">BUY MASK</button>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  )
}

export default CustomNavbar
