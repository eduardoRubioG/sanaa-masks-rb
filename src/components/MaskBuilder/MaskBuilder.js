import React, { Component } from "react"
import "./MaskBuilder.scss"

// Components
import WireSelector from "../WireSelector/WireSelector";
import ButtonGroup from "react-bootstrap/ButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

export class MaskBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wiredMask: false,
    }
    // constants
    this.maskTypeOptions = [
      { name: "Wired", value: true },
      { name: "Wireless", value: false },
    ];

    this.setRadioValue.bind(this);
  }

  setRadioValue = (value) => {
    this.setState({
      wiredMask: value,
    }); 
  }

  render() {
    return (
      <section className="mask-builder">
        <div className="mask-builder__type-select">
          <p className="mask-builder__type-select--tip"><em>1. Pick mask type</em></p>
        </div>
        <WireSelector />
        <div>{/* here it goes  */}</div>
      </section>
    )
  }
}

export default MaskBuilder
