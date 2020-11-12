import React from "react"
import { useStaticQuery } from "gatsby"
import Button from "react-bootstrap/Button"
import Img from "gatsby-image"
import Wave from "./Wave"
import "./hero.scss"

export default function Hero() {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          name: { eq: "HeroImage" }
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
    <div className="hero__container">
      <div className="hero__container--lg">
        <div className="hero__container--lg-text">
          {/* No. 1 */}
          <div className="hero__text-content">
            <div className="hero__header--lg">
              <h2>Do good,</h2>
              <h2>Look good.</h2>
            </div>

            <h2 className="hero__header--sm">Do good, Look good.</h2>

            <p className="hero__subtitle">
              Stylish cloth masks to protect your community while supporting
              them too
            </p>
          </div>

          <div className="hero__btn-bar" id="about-section">
            <Button variant="outline-dark" href="#about-section" className="hero__btn-bar--btn">
              Learn more
            </Button>
            <Button variant="dark-orange" href="#mask-section" className="hero__btn-bar--btn">
              Buy Mask
            </Button>
          </div>
        </div>

        {/* No. 2 */}
        <div className="hero__img">
          <div className="hero__img-backdrop" />
          <Img
            fluid={data.allFile.nodes[0].childImageSharp.fluid}
          />
        </div>
      </div>

      {/* No. 4 */}
      <div className="hero__wave">
        <Wave />
      </div>
    </div>
  )
}
