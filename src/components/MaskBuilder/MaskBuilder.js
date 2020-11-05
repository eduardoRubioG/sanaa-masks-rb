import React, { Component } from "react"
import "./MaskBuilder.scss"

// Components
import WireSelector from "../WireSelector/WireSelector"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"

export class MaskBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wired: 1,
      types: [],
      currentType: 'Select a type',
    }
    this.handleWiredSelection = this.handleWiredSelection.bind(this)
    this.handleNotWiredSelection = this.handleNotWiredSelection.bind(this)

    console.log(props, "Mask builder props")
    // this.serializeData(props.priceData.edges, props.productData.edges);
  }

  componentDidMount() {
    this.serializeData(this.props.priceData.edges, this.props.productData.edges)
  }

  /* Dev functions */

  print = (msg = " >>> ", ...params) => {
    console.log(msg, ...params)
  }

  /* Wire selector helper functions */
  handleWiredSelection() {
    this.setState({ wired: 1 })
  }
  handleNotWiredSelection() {
    this.setState({ wired: 0 })
  }

  /* Data processing */

  serializeData(priceData, productData) {
    const serializedPrices = priceData.map(price =>
      this.serializePriceData(price)
    )
    const serializedProducts = productData.map(product =>
      this.serializeProductData(product)
    )
    let merged = []
    let types = []
    if (serializedPrices.length && serializedProducts.length) {
      for (let i = 0; i < serializedPrices.length; i++) {
        merged.push({
          ...serializedProducts[i],
          ...serializedPrices.find(
            itmInner => itmInner.name === serializedProducts[i].name
          ),
        });
      }
      if (merged.length) {
        merged.forEach(product => {
          if (product.type) {
            types.push(...product.type)
          }
        });
        types = types.map((type) => {
          return type.replace(/\w+/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
          });
        });
        types.unshift('All');
        types = [...new Set(types)];
        this.setState({ types: types });
        this.print("Merged string", types)
      }
    }

    this.setState({
      types: types && types.length ? types : ["No categories available"],
    })

    this.print("Serialized DATA", merged)
  }

  serializePriceData(price) {
    return {
      id: price.node.id || undefined,
      name: price.node.product.name || undefined,
      type: price.node.product.metadata.type
        ? price.node.product.metadata.type.split(",").map(item => item.trim())
        : undefined,
      price: price.node.unit_amount || undefined,
    }
  }

  serializeProductData(product) {
    return {
      id: product.node.id || undefined,
      name: product.node.name || undefined,
      image:
        product.node.localFiles && product.node.localFiles.length
          ? product.node.localFiles[0].childImageSharp.fixed
          : null,
    }
  }

  render() {
    const { wired, types, currentType } = this.state
    return (
      <section className="mask-builder">
        <p className="mask-builder__tip">
          <em>1. Pick mask type</em>
        </p>
        <WireSelector
          wired={wired}
          handleWiredSelection={this.handleWiredSelection}
          handleNotWiredSelection={this.handleNotWiredSelection}
        />
        <p className="mask-builder__tip">
          <em>2. Select mask design</em>
        </p>
        <div className="mask-builder__designer">
          {/* here it goes  */}
          <div className="mask-builder__designer--header">
            { currentType ? currentType : 'Select a type' }
            <Dropdown
              as={ButtonGroup}
              id="dropdown-item-button"
              title="Categories"
              variant="light-orange"
              className="test"
            >
              <Dropdown.Toggle
                id="categories-dropdown"
                variant="light-orange"
                className="categories-dropdown"
              >
                Categories
              </Dropdown.Toggle>
              <Dropdown.Menu className="categories-dropdown__menu">
                {types.map(types => {
                  return (
                    <Dropdown.Item as="button" key={types}>
                      {types}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="mask-builder__designer--content">

          </div>
        </div>
      </section>
    )
  }
}

export default MaskBuilder
