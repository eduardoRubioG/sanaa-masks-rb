import React, { useState } from "react"
import { useShoppingCart } from "use-shopping-cart"
import "./Cart.scss"

// Components
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import ButtonToolbar from "react-bootstrap/ButtonToolbar"
import Spinner from "react-bootstrap/Spinner"
import Modal from "react-bootstrap/Modal"

const formatPrice = (price, quantity = 1) => {
  const priceFloat = (price/100).toFixed(2)
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd'}).format(priceFloat * quantity);
}

const Cart = () => {
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [tryingToClearCart, setTryingToClearCart] = useState(false)
  /* Gets the totalPrice and a method for redirecting to stripe */
  const {
    formattedTotalPrice,
    redirectToCheckout,
    cartCount,
    clearCart,
    cartDetails,
    removeItem,
    incrementItem,
    decrementItem,
  } = useShoppingCart()
  let CartItemizedList
  const cartClass = (cartCount <= 0) ? 'cart empty' : 'cart';
  if (cartDetails && Object.keys(cartDetails)) {
    CartItemizedList = Object.keys(cartDetails).map(item => {
      const btnClass = editing ? "cart__items--btn" : "cart__items--btn edit"
      const btnGroupClass = editing
        ? "cart__items--btn-group"
        : "cart__items--btn-group edit"
      return (
        <div className="cart__items--item" key={cartDetails[item].sku}>
          <div className="cart__items--item--line">
            <button
              className={btnClass}
              onClick={() => {
                removeItem(cartDetails[item].sku)
                setEditing(false)
              }}
            >
              <div className="cart__items--btn--icon" />
            </button>
            <p className="cart__items--txt">
              {cartDetails[item].name} ({cartDetails[item].quantity}) -{" "}
              {formatPrice(cartDetails[item].price, cartDetails[item].quantity)}
            </p>
          </div>
          <div>
            <ButtonToolbar>
              <ButtonGroup>
                <Button
                  variant="outline-light"
                  size="sm"
                  key="subtractItem"
                  className={btnGroupClass}
                  onClick={() => decrementItem(cartDetails[item].sku)}
                >
                  -
                </Button>
                <Button
                  variant="outline-light"
                  size="sm"
                  key="addItem"
                  className={btnGroupClass}
                  onClick={() => incrementItem(cartDetails[item].sku)}
                >
                  +
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </div>
      )
    })
  }
  return (
    <div className={cartClass}>
      {/* This is where we'll render our cart */}
      <div className="cart__summary--header">
        <p>
          Number of Items:{" "}
          <span className="cart__summary--header-txt">{cartCount}</span>
        </p>
        <Button
          variant="outline-light"
          size="sm"
          className="cart__summary--header--edit"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Done" : "Edit"}
        </Button>
      </div>
      <div className="cart__items">{CartItemizedList}</div>
      <p>Total: {formattedTotalPrice}</p>
      <div className="cart__footer">
        <Button
          variant="outline-light"
          onClick={() => setTryingToClearCart(true)}
          className="cart__footer--btn clear"
        >
          Clear cart
        </Button>
        <Button
          variant="light-orange"
          className="cart__footer--btn checkout"
          disabled={loading}
          onClick={() => {
            setLoading(true)
            redirectToCheckout()
          }}
        >
          {loading ? (
            <Spinner as="span" size="sm" animation="grow" />
          ) : (
            "Checkout"
          )}
        </Button>
      </div>

      {/* Modals */}
      <Modal
        show={tryingToClearCart}
        onHide={() => setTryingToClearCart(false)}
        centered
        dialogClassName="modal"
      >
        <Modal.Header closeButton className="modal--theme">
          <Modal.Title>Do you want to empty your cart?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal--theme">
          If you clear your cart, you will be unable to restore your selected
          products
        </Modal.Body>
        <Modal.Footer className="modal--theme">
          <Button
            variant="light-orange"
            className="modal__btn--cancel"
            onClick={() => setTryingToClearCart(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outline-dark"
            className="modal__btn--clear"
            onClick={() => {
              setTryingToClearCart(false);
              clearCart();
            }}
          >
            Clear cart
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Cart
