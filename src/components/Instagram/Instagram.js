import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { BsHeartFill } from "react-icons/bs"
import ScrollAnimation from "react-animate-on-scroll"
import Img from "gatsby-image"
import "./Instagram.scss"

function Instagram() {
  const data = useStaticQuery(graphql`
    query InstagramQuery {
      allInstaNode(limit: 5) {
        edges {
          node {
            localFile {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)
  const instagramImages = data.allInstaNode.edges
    .filter(img => Boolean(img))
    .map(img => img.node.localFile.childImageSharp.fluid)
    .map((img, indx) => (
      <ScrollAnimation
        delay={ indx * 40}
        animateIn="animate__fadeInUp"
        animateOnce={true}
        offset={35}
        key={indx}
      >
        <div className="instagram__img">
          <a
            href="https://www.instagram.com/masksbysanaa_/"
            className="instagram__link"
            aria-label="Go to instagram"
            aria-hidden="true"
          ><p style={{ fontSize: 0}}>Link to navigate to instagram</p></a>
          <BsHeartFill className="instagram__icon-fill" />
          <Img fluid={img} />
        </div>
      </ScrollAnimation>
    ))
  const emptyState = <div style={{ display: "block" }}>Error</div>

  return (
    <div className="instagram__container">
      <ScrollAnimation
        animateIn="animate__fadeInUp"
        animateOnce={true}
        offset={35}
      >
        <div className="instagram__header">
          <p>Check us out on Instagram!</p>
          <div className="instagram__header--bar" />
        </div>
      </ScrollAnimation>
      <div className="instagram">
        {instagramImages && instagramImages.length
          ? instagramImages
          : emptyState}
      </div>
    </div>
  )
}

export default Instagram
