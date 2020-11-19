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
      wiredProducts: [],
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
    const serializedPrices = priceData
      .map(price => this.serializePriceData(price))
      .filter(data => Boolean(data))
    const serializedProducts = productData
      .map(product => this.serializeProductData(product))
      .filter(data => Boolean(data))
    const splitPrices = this.checkForWiredPrices(serializedPrices)

    this.mergeProductsAndPrices(
      splitPrices.nonWiredProducts,
      serializedProducts
    )
    this.mergeProductsAndPrices(
      splitPrices.wiredProducts,
      serializedProducts,
      true
    )
  }

  mergeProductsAndPrices(prices, products, wiredPass = false) {
    let merged = []
    let types = []
    if (prices.length && products.length) {
      for (let i = 0; i < prices.length && i < products.length; i++) {
        merged.push({
          ...products[i],
          ...prices.find(itmInner => itmInner.name === products[i].name),
        })
      }
      // We only want this to run if we're looking at non wired products since it's
      // the base product list
      if (merged.length && !wiredPass) {
        merged.forEach(product => {
          if (product.type) {
            types.push(...product.type)
          }
        })
        types.unshift("All")
        types = [...new Set(types)]
        this.setState({
          types: types && types.length ? types : ["No categories available"],
          products: merged && merged.length ? merged : [],
        })
      } else {
        this.setState({
          wiredProducts: merged && merged.length ? merged : [],
        })
      }
    }
  }

  checkForWiredPrices(prices) {
    let wiredPrices = []
    let filteredPrices = []
    let seenPrices = []
    prices.map(price => {
      if (seenPrices.includes(price.name)) {
        /* This is probably a wired price that has already been seen */
        // add the normal product and then add the wired product to the wired product list
        const matchingIndex = filteredPrices.findIndex(
          seen => seen.name === price.name
        )
        wiredPrices.push({
          id: price.id,
          name: filteredPrices[matchingIndex].name,
          type: filteredPrices[matchingIndex].type,
          price: Math.max(filteredPrices[matchingIndex].price, price.price),
        })
        filteredPrices[matchingIndex].price = Math.min(
          filteredPrices[matchingIndex].price,
          price.price
        )
      } else {
        // This is not a wired price so add to filteredPrices & add.product name to seen
        filteredPrices.push(price)
        seenPrices.push(price.name)
      }
    })
    return {
      nonWiredProducts: filteredPrices,
      wiredProducts: wiredPrices,
    }
  }

  serializePriceData(price) {
    return price.node.product.name === "Wired" ||
      price.node.product.name === "wired"
      ? undefined
      : {
          id: price.node.id || undefined,
          name: price.node.product.name || undefined,
          type: price.node.product.metadata.type
            ? price.node.product.metadata.type
                .split(",")
                .map(item => item.trim())
            : undefined,
          price: price.node.unit_amount || undefined,
        }
  }

  serializeProductData(product) {
    return product.node.name === "Wired" || product.node.name === "wired"
      ? undefined
      : {
          id: product.node.id || undefined,
          name: product.node.name || undefined,
          image:
            product.node.localFiles && product.node.localFiles.length
              ? product.node.localFiles[0].childImageSharp.fixed
              : null,
        }
  }

  filterProducts(typeFilter) {
    const { products, wiredProducts, wired } = this.state
    let filteredProducts = []
    if (typeFilter === "All") {
      filteredProducts = wired ? wiredProducts : products
    } else {
      if (wired) {
        if (wiredProducts && wiredProducts.length) {
          filteredProducts = wiredProducts.filter(
            product =>
              product.type &&
              product.type.length &&
              product.type.includes(typeFilter)
          )
        }
      } else {
        if (products && products.length) {
          filteredProducts = products.filter(
            product =>
              product.type &&
              product.type.length &&
              product.type.includes(typeFilter)
          )
        }
      }
    }
    this.setState({
      filteredProducts:
        filteredProducts && filteredProducts.length ? filteredProducts : [],
      currentType: typeFilter,
    })
  }

  setType(value) {
    this.filterProducts(value)
  }

  render() {
    const {
      wired,
      types,
      currentType,
      products,
      wiredProducts,
      filteredProducts,
    } = this.state
    let ProductItemRender
    if (currentType !== "Select a type") {
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
              wired={wired}
            ></MaskProduct>
          )
        })
      } else {
        ProductItemRender = <p className="mask-builder__empty-state">Nothing to show here..</p>
      }
    } else {
      const productsToRender = wired ? wiredProducts : products
      ProductItemRender = productsToRender.map((product, idx) => {
        return (
          <MaskProduct
            id={product.id || undefined}
            name={product.name || undefined}
            image={product.image || undefined}
            price={product.price || undefined}
            type={product.type || undefined}
            key={product.id || idx}
            wired={wired}
          ></MaskProduct>
        )
      })
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
            <p>{currentType ? currentType : "Select a type"}</p>
            <Dropdown
              as={ButtonGroup}
              id="dropdown-item-button"
              title="Categories"
              variant="light-orange"
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
