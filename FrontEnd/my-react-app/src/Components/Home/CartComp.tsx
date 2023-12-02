import React, { useEffect, useState } from "react";
import FoodItem from "../../Classes/FoodItem";
import Cart from "../../Classes/Cart";

interface CartProps {
  cart: Cart;
}

const CartComp = ({ cart }: CartProps) => {
  const [cartItems, setCartItems] = useState(cart.items);
  
  const handleRemove = (item: any) => {
    cart.removeFromCart(item.id);
    setCartItems(cart.items)
  };


  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="items">
        {cartItems.map((item: FoodItem, index: number) => (
          <div className="item" key={index}>
               <button
        onClick={() => {
          handleRemove(item);
        }}
        className="remove-item"
      >
        X
      </button>
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Quantity: {item.servings}</p>
              </div>
            </div>
          )
        )}
      </div>
      {/* Summary Section */}
      <div className="summary">
        <h3>Summary</h3>
        <p>Total Items: {cartItems.length}</p>
        <p>Total Price: ${calculateTotalPrice(cartItems)}</p>
        {/* Add Checkout Button or Additional Actions */}
      </div>
    </div>
  );
};

// Helper function to calculate total price
const calculateTotalPrice = (cartItems: any) => {
  return cartItems.reduce(
    (total: any, item: any) => total + item.price * item.quantity,
    0
  );
};

export default CartComp;
