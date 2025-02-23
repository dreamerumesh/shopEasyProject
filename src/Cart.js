import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart,handleRemoveFromCart,handleIncrementQuantity,handleDecrementQuantity }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before placing an order.");
    } else {
      alert("Your order has been placed successfully!");
    }
  };
  return (
    <div className="cart-container">
      {/* Left Side - Cart Items */}
      <div className="cart-items">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            
                <div key={item.id} className="cart-item">
                  <Link to={`/product/${item.id}`} key={item.id} className="product-link">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  </Link>
                  <div className="cart-item-details">
                  <Link to={`/product/${item.id}`} key={item.id} className="product-link">
                    <h3 className="cart-item-title">{item.title}</h3>
                    </Link>
                    <p className="cart-item-price">${item.price} x {item.quantity} &nbsp; &nbsp;
                    <button onClick={() => handleDecrementQuantity(item.id)}>-</button>&nbsp; &nbsp;
                    <span>{item.quantity}</span>&nbsp; &nbsp;
                    <button onClick={() => handleIncrementQuantity(item.id)}>+</button></p>
                    <p className="cart-item-total">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                    <button  className="remove-button" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </div>
                </div>
            
          ))
        )}
      </div>

      {/* Right Side - Total Bill */}
      <div className="cart-summary">
        <h2>Order Summary</h2>
        <p className="total-amount">Total: ${calculateTotal()}</p>
        <button className="place-order" onClick={handlePlaceOrder} >Place Order</button>
      </div>
    </div>
  );
};

export default Cart;
