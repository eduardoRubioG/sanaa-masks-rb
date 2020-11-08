import React, { useState, useEffect } from "react"
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"
import { wiredAdditionalCost } from "../content";
import Img from "gatsby-image"
import "./MaskProduct.scss"

function MaskProduct(props) {
  const { id, image, name, price, wired, wiredSku } = props
  const { addItem, cartDetails } = useShoppingCart()
  const [count, setCount] = useState(0)

  const addWired = () => {
    if(wired && wiredSku) {
      addItem({
        name: "Wired",
        sku: wiredSku.id, 
        price: wiredSku.unit_amount,
        currency: 'USD'
      });
    }
  }

  let ImageElement
  if (image) {
    ImageElement = <Img fixed={image} className="mask-product__image" />
  } else {
    ImageElement = (
      <div className="mask-product__image--empty">No image available</div>
    )
  }

  useEffect(() => {
    const productsInCart = Object.keys(cartDetails).map(key => {
      return key
    })
    const productCartId =
      productsInCart &&
      productsInCart.length &&
      productsInCart.filter(product => product === id)
    const cartProduct = cartDetails[productCartId];
    cartProduct && cartProduct.quantity ? setCount(cartProduct.quantity) : setCount(0);
  }, [cartDetails])

  return (
    <button
      className="mask-product"
      onClick={() => {
        addItem({
          name: name || undefined,
          sku: id || undefined,
          price: price || undefined,
          currency: "USD",
        })
        setCount(count + 1)
        addWired()
      }}
    >
      {count > 0 ? (
        <div className="mask-product__count">{count}</div>
      ) : (
        <div className="mask-product__count inactive">{count}</div>
      )}
      {ImageElement}
      <p className="mask-product__text">
        {name} |{" "}
        {formatCurrencyString({
          value: parseInt(price),
          currency: "usd",
        })}
      </p>
    </button>
  )
}

export default MaskProduct
