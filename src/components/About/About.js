import React from "react"
import "./About.scss"

// Components
import NumberIcon from "../NumberIcon/NumberIcon"
import ScrollAnimation from "react-animate-on-scroll"
import { aboutTheOwnerText, stepData } from "../content"
// import DonationCounter from "../DonationCounter/DonationCounter"

export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        <ScrollAnimation animateIn="animate__fadeInUp" offset={35}>
          <div className="about__content">
            <p className="about__content--header">About me</p>
            <div className="about__content--bar" />
            <p className="about__content--text">{aboutTheOwnerText}</p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="animate__fadeInUp" offset={35}>
          <div className="about__content">
            <p className="about__content--header">How it works</p>
            <div className="about__content--bar" />

            <div className="about__direction-items">
              <NumberIcon value="1" />
              <div className="about__direction-items--container">
                <p className="about__direction-items--text">
                  {stepData.one.header}
                </p>
              </div>
            </div>
            <div className="about__direction-items">
              <NumberIcon value="2" />
              <div className="about__direction-items--container">
                <p className="about__direction-items--text">
                  {stepData.two.header}
                </p>
              </div>
            </div>
            <div className="about__direction-items">
              <NumberIcon value="3" />
              <div className="about__direction-items--container">
                <p className="about__direction-items--text">
                  {stepData.three.header}
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
        {/* <DonationCounter /> */}
      </div>
    </section>
  )
}
