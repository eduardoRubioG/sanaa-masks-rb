import React from "react"
import "./About.scss"

// Components
import ScrollAnimation from "react-animate-on-scroll"
import AccordionStep from "../AccordionStep/AccordionStep"
import { aboutTheOwnerText } from "../content"
// import DonationCounter from "../DonationCounter/DonationCounter"

export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        <ScrollAnimation animateIn="animate__fadeInUp" animateOnce={true} offset={35}>
          <div className="about__content">
            <p className="about__content--header">About me</p>
            <div className="about__content--bar" />
            <p className="about__content--text">{aboutTheOwnerText}</p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="animate__fadeInUp" animateOnce={true} offset={35}>
          <div className="about__content">
            <p className="about__content--header">How it works</p>
            <div className="about__content--bar" />
            <div style={{ margin: '0', padding: '0'}}>
              <AccordionStep/>
            </div>
          </div>
        </ScrollAnimation>
        {/* <DonationCounter /> */}
      </div>
    </section>
  )
}
