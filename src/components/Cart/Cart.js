import React, { useState } from "react"
import { useShoppingCart } from "use-shopping-cart"
import "./Cart.scss"

// Components
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import ButtonToolbar from "react-bootstrap/ButtonToolbar"
import Spinner from "react-bootstrap/Spinner"

const Cart = () => {
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  /* Gets the totalPrice and a method for redirecting to stripe */
  const {
    formattedTotalPrice,
    redirectToCheckout,
    cartCount,
    clearCart,
    cartDetails,
    removeItem,
    incrementItem,
    decrementItem
  } = useShoppingCart()
  let CartItemizedList
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
              {cartDetails[item].price}
            </p>
          </div>
          <div>
            <ButtonToolbar>
              <ButtonGroup>
                <Button
                  variant="outline-light"
                  size="sm"
                  key='subtractItem'
                  className={btnGroupClass}
                  onClick={() => decrementItem(cartDetails[item].sku)}
                >
                  -
                </Button>
                <Button
                  variant="outline-light"
                  size="sm"
                  key='addItem'
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
    <div className={`cart ${cartCount <= 0 ? 'empty' : ''}`}>
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
          onClick={clearCart}
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
    </div>
  )
}

export default Cart
