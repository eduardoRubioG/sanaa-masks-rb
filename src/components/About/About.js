import React from "react"
import "./About.scss"

// Components
import NumberIcon from "../NumberIcon/NumberIcon";
import DonationCounter from "../DonationCounter/DonationCounter";

export default function About() {
  return (
    <section className="about__container">
      <div className="about__content">
        <p className="about__content--header">About me</p>
        <div className="about__content--bar" />
        <p className="about__content--text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo
          elit, aliquet a fermentum at, venenatis nec sapien. Nulla in nunc
          dictum, iaculis quam non, mollis erat. Suspendisse non suscipit elit,
          a sagittis nibh. Aliquam tortor libero, vulputate quis ligula
          vestibulum, scelerisque tempus ipsum. Suspendisse vel tincidunt risus,
          vitae eleifend lorem.{" "}
        </p>
      </div>
      <div className="about__content">
        <p className="about__content--header">How it works</p>
        <div className="about__content--bar" />

        <div className="about__direction-items">
          <NumberIcon value="1" />
          <div className="about__direction-items--container">
            <p className="about__direction-items--text">
              Pick a mask style and pattern
            </p>
          </div>
        </div>
        <div className="about__direction-items">
          <NumberIcon value="2" />
          <div className="about__direction-items--container">
            <p className="about__direction-items--text">
              Let me know when I can send this to you
            </p>
          </div>
        </div>
        <div className="about__direction-items">
          <NumberIcon value="3" />
          <div className="about__direction-items--container">
            <p className="about__direction-items--text">
            25% of the proceeds go to Some non-profit but let me know if you’re willing to donate more
            </p>
          </div>
        </div>
      </div>

      <DonationCounter />
    </section>
  )
}
