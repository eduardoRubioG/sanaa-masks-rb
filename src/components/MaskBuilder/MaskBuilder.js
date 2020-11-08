import React, { Component } from "react"
import "./MaskBuilder.scss"

// Components
import WireSelector from "../WireSelector/WireSelector"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import MaskProduct from "../MaskProduct/MaskProduct"

export class MaskBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wired: 1,
      types: [],
      currentType: "Select a type",
      products: [],
      filteredProducts: [],
    }
    this.handleWiredSelection = this.handleWiredSelection.bind(this)
    this.handleNotWiredSelection = this.handleNotWiredSelection.bind(this)
  }

  componentDidMount() {
    this.serializeData(this.props.priceData.edges, this.props.productData.edges)
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
        })
      }
      if (merged.length) {
        merged.forEach(product => {
          if (product.type) {
            types.push(...product.type)
          }
        })
        types.unshift("All")
        types = [...new Set(types)]
        this.setState({ types: types })
      }
    }

    this.setState({
      types: types && types.length ? types : ["No categories available"],
      products: merged && merged.length ? merged : [],
    })
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

  filterProducts(typeFilter) {
    const { products } = this.state
    let filteredProducts = []
    if (products && products.length) {
      filteredProducts = products.filter(
        product =>
          product.type &&
          product.type.length &&
          product.type.includes(typeFilter)
      )
    }
    this.setState({
      filteredProducts:
        filteredProducts && filteredProducts.length 
          ? filteredProducts
          : [],
      currentType: typeFilter,
    });
  }

  setType(value) {
    this.filterProducts(value)
  }

  render() {
    const { wired, types, currentType, products, filteredProducts } = this.state
    let ProductItemRender
    if (filteredProducts && filteredProducts.length) {
      ProductItemRender = filteredProducts.map((product, idx) => {
        return (
          <MaskProduct
            id={product.id || undefined}
            name={product.name || undefined}
            image={product.image || undefined}
            price={product.price || undefined}
            type={product.type || undefined}
            key={product.id || idx}
          ></MaskProduct>
        )
      })
    } else if (products && products.length) {
      ProductItemRender = products.map((product, idx) => {
        return (
          <MaskProduct
            id={product.id || undefined}
            name={product.name || undefined}
            image={product.image || undefined}
            price={product.price || undefined}
            type={product.type || undefined}
            key={product.id || idx}
          ></MaskProduct>
        )
      })
    } else {
      ProductItemRender = <p>Nothing to show here..</p>
    }
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
          <div className="mask-builder__designer--header">
            {currentType ? currentType : "Select a type"}
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
                    <Dropdown.Item
                      className="categories-dropdown__menu--items"
                      as="button"
                      key={types}
                      value={types}
                      onClick={e => this.setType(e.target.value)}
                    >
                      {types}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="mask-builder__designer--content">
            {ProductItemRender}
          </div>
        </div>
      </section>
    )
  }
}

export default MaskBuilder
