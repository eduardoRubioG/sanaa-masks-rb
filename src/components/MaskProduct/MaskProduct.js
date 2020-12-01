import React, { useState, useEffect } from "react"
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Img from "gatsby-image"
import "./MaskProduct.scss"

function MaskProduct(props) {
  const { id, image, name, price } = props
  const { addItem, cartDetails } = useShoppingCart()
  const [count, setCount] = useState(0)
  const [addConfirmation, setAddConfirmation] = useState(false)

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
    const cartProduct = cartDetails[productCartId]
    cartProduct && cartProduct.quantity
      ? setCount(cartProduct.quantity)
      : setCount(0)
  }, [cartDetails, id])

  return (
    <>
      <button
        className="mask-product"
        onClick={() =>
          setAddConfirmation(true)
        }
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

      <Modal
        show={addConfirmation}
        onHide={() => setAddConfirmation(false)}
        centered
        dialogClassName="modal"
      >
        <Modal.Header
          closeButton
          className="mask-product__confirm-modal--theme"
        >
          <Modal.Title className="mask-product__confirm-modal--theme">{`Add ${name} to cart?`}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mask-product__confirm-modal--theme">
        {
          image 
          ? <Img fixed={image} className="mask-product__confirm-modal--img" />
          : <p>There's no image here, but I'm sure it'll look great on you!</p>
        }
        </Modal.Body>
        <Modal.Footer className="mask-product__confirm-modal--theme">
          <Button
            variant="outline-dark"
            className="modal__btn--clear"
            onClick={() => {
              //removeItem(selectedItem) // TODO: this should be add to cart
              setAddConfirmation(false)
            }}
          >
            Cancel
          </Button>
          <Button
            variant="light-orange"
            className="modal__btn--cancel"
            onClick={() => {
              setAddConfirmation(false)
              addItem({
                name: name || undefined,
                sku: id || undefined,
                price: price || undefined,
                currency: "USD",
              })
              setCount(count + 1)
            }}
          >
            Add to cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MaskProduct
