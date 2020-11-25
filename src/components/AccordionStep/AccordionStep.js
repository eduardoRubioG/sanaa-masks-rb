import React from "react"
import "./AccordionStep.scss"

import NumberIcon from "../NumberIcon/NumberIcon"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import { stepData } from "../content"

function AccordionStep() {
  return (
    <Accordion defaultActiveKey="0" className="accordion">
      <Card bsPrefix="accordion__card">
        <Card.Header bsPrefix="accordion__card--header">
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <div className="accordion__step">
              <div className="accordion__icon">
                <NumberIcon value="1"/>
              </div>
              <p className="accordion__step--text">
                {stepData.one.header}
              </p>
            </div>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>{stepData.one.text}</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card bsPrefix="accordion__card">
        <Card.Header bsPrefix="accordion__card--header">
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <div className="accordion__step">
              <div className="accordion__icon">
                <NumberIcon value="2"/>
              </div>
              <p className="accordion__step--text">
              {stepData.two.header}
              </p>
            </div>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>{stepData.two.text}</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card bsPrefix="accordion__card">
        <Card.Header bsPrefix="accordion__card--header">
          <Accordion.Toggle as={Card.Header} eventKey="2">
            <div className="accordion__step">
              <div className="accordion__icon">
                <NumberIcon value="3"/>
              </div>
              <p className="accordion__step--text">
              {stepData.three.header}
              </p>
            </div>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>{stepData.three.text}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default AccordionStep
