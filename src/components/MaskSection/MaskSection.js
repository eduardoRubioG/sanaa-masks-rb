import React, { Component } from "react"
import "./MaskSection.scss"

// Components
import Humaans from "../Humaans/Humaans"
import ScrollAnimation from "react-animate-on-scroll"
import MaskBuilder from "../MaskBuilder/MaskBuilder"

export default class MaskSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
    }
  }
  render() {
    return (
      <>
        <section className="mask-section">
          {/* <div className="mask-section__header-container"> */}
          <div className="mask-section__humaans">
            <ScrollAnimation animateIn="animate__fadeInUp" animateOnce={true} offset={35}>
              <Humaans />
            </ScrollAnimation>
          </div>
          <ScrollAnimation animateIn="animate__fadeInUp" animateOnce={true} offset={35}>
            <div className="mask-section__header" id="mask-section">
              <p className="mask-section__header--text">Customize your Mask</p>
              <div className="mask-section__bar" />
            </div>
          </ScrollAnimation>
          {/* </div> */}
          {/* MaskSelector */}
          <MaskBuilder
            priceData={this.props.priceData}
            productData={this.props.productData}
          />

          {/* Checkout Section  */}
        </section>
      </>
    )
  }
}
