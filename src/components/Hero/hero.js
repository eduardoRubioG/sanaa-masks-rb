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
      
      {/* No. 1 */}
      <div className="hero__text-content">
        <h2 className="hero__header--lg">
          Do good,
          <br />
          Look good.
        </h2>

        <h2 className="hero__header--sm">Do good, Look good.</h2>

        <p className="hero__subtitle">
          Stylish cloth masks to protect your community while supporting them
          too
        </p>
      </div>

      {/* No. 2 */}
      <Img fluid={data.allFile.nodes[0].childImageSharp.fluid} />

      {/* No. 3 */}
      <div className="hero__btn-bar">
        <Button variant="outline-dark">Learn more</Button>
        <Button variant="dark-orange">Buy Mask</Button>
      </div>

      {/* No. 4 */}
      <div className="hero__wave">
        <Wave />
      </div>
    </div>
  )
}
