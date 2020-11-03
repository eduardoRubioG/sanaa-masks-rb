import React, { Component } from "react";
import "./MaskSection.scss";

// Components
import Humaans from "../Humaans/Humaans";
import MaskBuilder from "../MaskBuilder/MaskBuilder";

export default class MaskSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
    console.log(props);
  }
  render() {
    return (
      <>
        <section className="mask-section">
          <div className="mask-section__humaans">
            <Humaans />
          </div>
          <div className="mask-section__header">
            <p className="mask-section__header--text">Customize your Mask</p>
            <div className="mask-section__bar" />
          </div>
          {/* MaskSelector */}
          <MaskBuilder />

          {/* Checkout Section  */}
        </section>
      </>
    )
  }
}
