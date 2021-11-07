/* eslint-disable */

import React, {Component} from 'react'

import CartContext from '../CartContext'

import Header from '../Header'

import {AiOutlineMinusSquare, AiOutlinePlusSquare} from 'react-icons/ai'

import imageNoOrder from '../assets/cooking1.png'
import {Link} from 'react-router-dom'

import Tick from '../assets/Vector.png'

export default class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            cartItems,
            decQuantity,
            incQuantity,
            orderPlaced,
            setOrderPlaced,
          } = value
          console.log(orderPlaced)
          const inc = id => {
            decQuantity(id)
          }

          const placeOrder = () => {
            console.log('clicked')
            setOrderPlaced()
          }

          const dec = id => {
            incQuantity(id)
          }

          const getCost = () => {
            if (cartItems.length > 0) {
              let totalCost = cartItems[0]['quantity'] * cartItems[0]['cost']
              for (let i = 1; i < cartItems.length; i++) {
                totalCost =
                  totalCost + cartItems[i]['quantity'] * cartItems[i]['cost']
              }
              return <p>₹ {totalCost}</p>
            }
            return null
          }

          return (
            <>
              <Header />
              <ul>
                {orderPlaced ? (
                  <>
                    <img src={Tick} />
                    <h1>Payment Successful</h1>
                    <p>
                      Thank you for ordering Your payment is successfully
                      completed.
                    </p>
                    <Link to="/">
                      <button className="btn btn-primary">
                        Go To Home Page
                      </button>
                    </Link>
                  </>
                ) : cartItems === [] ||
                  cartItems === null ||
                  cartItems.length === 0 ? (
                  <>
                    <img src={imageNoOrder} alt="empty cart" />
                    <h1>No Orders Yet!</h1>
                    <p>Your cart is empty. Add something from the menu.</p>
                    <Link to="/">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        className="alp"
                      >
                        Order now
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        marginTop: '30px',
                      }}
                    >
                      <p>Item</p> <p>Quantity</p> <p>Price</p>
                    </div>
                    {cartItems.map(e => (
                      <li
                        key={e.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          marginTop: '30px',
                        }}
                      >
                        <div testid="cartItem">
                          {' '}
                          <img
                            style={{width: '155px'}}
                            src={e.image_url}
                            alt={e.name}
                          />
                          <h1>{e.name}</h1>
                        </div>
                        <div>
                          <AiOutlineMinusSquare onClick={() => inc(e.id)} />
                          <p>{e.quantity}</p>
                          <AiOutlinePlusSquare onClick={() => dec(e.id)} />
                        </div>
                        <div>{e.cost * e.quantity}</div>
                      </li>
                    ))}
                    <div
                      style={{display: 'flex', justifyContent: 'space-around'}}
                    >
                      <p>Order Total :</p>
                      {getCost()}
                    </div>
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={placeOrder}
                    >
                      Place Order
                    </button>
                  </>
                )}
              </ul>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
