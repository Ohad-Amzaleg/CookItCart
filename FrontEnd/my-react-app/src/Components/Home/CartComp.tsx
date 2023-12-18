import React, { useEffect, useState } from "react";
import FoodItem from "../../Classes/FoodItem";
import Cart from "../../Classes/Cart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface CartProps {
  cart: Cart;
}

const CartComp = ({ cart }: CartProps) => {
  const [cartItems, setCartItems] = useState(cart.items);
  const [cartTable, setCartTable] = useState(cart.cartTable);

  const handleRemove = (item: any) => {
    cart.removeFromCart(item.id);
    setCartItems(cart.items);
    setCartTable(cart.cartTable);
  };

  const tableComponent = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Quantity&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(cartTable.entries()).map(
            ([itemName, quantity]: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {itemName}
                </TableCell>
                <TableCell align="right">{quantity}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div className="cart">
      <div>
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
          ))}
        </div>
        <div>{tableComponent()}</div>
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
