import React, { useState } from "react"
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"
import Img from "gatsby-image"
import "./MaskProduct.scss"

function MaskProduct(props) {
  const { id, image, name, price, type } = props
  const { addItem } = useShoppingCart()
  const [count, setCount] = useState(0)
  let ImageElement;
  if( image ) {
    ImageElement = <Img fixed={image} className="mask-product__image" />
  } else {
    ImageElement = <div className="mask-product__image--empty">No image available</div>
  }

  return (
    <button
      className="mask-product"
      onClick={() => {
        addItem({
          name: name || undefined,
          sku: id || undefined,
          price: price || undefined,
          currency: "USD",
        });
        setCount(count + 1);
      }}
    >
      {
        count > 0 ?
        <div className="mask-product__count">{count}</div> 
        :
        <div className="mask-product__count inactive">{count}</div> 

      }
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
