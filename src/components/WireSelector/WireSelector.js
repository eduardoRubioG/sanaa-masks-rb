import React, { Component } from "react"
import "./WireSelector.scss"

export default class WireSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wired: 1, // 1 is true
    }
  }

  selectWiredOption = () => {
    this.setState({ wired: 1 })
  }
  selectNotWiredOption = () => {
    this.setState({ wired: 0 })
  }

  render() {
    const isWiredSelected = this.state.wired === 1 ? "active" : ""
    const isNotWiredSelected = this.state.wired === 0 ? "active" : ""

    return (
        <div className="wire-selector">
          <div className={`wire-selector__card ${isWiredSelected}`}>
            <button onClick={this.selectWiredOption}>Wired</button>
          </div>
          <div className={`wire-selector__card ${isNotWiredSelected}`}>
            <button onClick={this.selectNotWiredOption}>Not Wired</button>
          </div>
        </div>
    )
  }
}
