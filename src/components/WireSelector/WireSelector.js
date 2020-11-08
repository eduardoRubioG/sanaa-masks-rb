import React, { Component } from "react"
import "./WireSelector.scss"

export default class WireSelector extends Component {
  constructor(props) {
    super(props)
    this.selectWiredOption = this.selectWiredOption.bind(this);
    this.selectNotWiredOption = this.selectNotWiredOption.bind(this);
  }

  selectWiredOption = () => {
    this.props.handleWiredSelection();
  }
  selectNotWiredOption = () => {
    this.props.handleNotWiredSelection();
  }

  render() {
    const isWiredSelected = this.props.wired === 1 ? "active" : ""
    const isNotWiredSelected = this.props.wired === 0 ? "active" : ""

    return (
        <div className="wire-selector">
          <div className={`wire-selector__card ${isWiredSelected}`}>
            <button onClick={this.selectWiredOption}>
            <p className="wired-card">
              Wired
              <span className="wired-card__info">
                {' (+$3.00)'}
              </span>
            </p>
            </button>
          </div>
          <div className={`wire-selector__card ${isNotWiredSelected}`}>
            <button onClick={this.selectNotWiredOption}>Not Wired</button>
          </div>
        </div>
    )
  }
}
