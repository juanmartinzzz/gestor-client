import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { currency } from "../../services/formatter";
import { applyDiscountPercentage } from "../../services/transformer";

const discountPercentage = process.env.REACT_APP_DISCOUNT_PERCENTAGE;

const getTotal = cart => cart.items.reduce((sum, {product}) => sum + product.price, 0);

const CartItem = ({item}) => {
  const { product } = item;

  return (
    <Typography variant="subtitle2">{product.pieces} {product.name}: {currency(product.price)}</Typography>
  )
}

const CartItems = ({ cart }) => {
  const price = getTotal(cart);
  const discountedPrice = applyDiscountPercentage(price, discountPercentage);

  return (
    <Fragment>
      {cart.items.map((item, i) => (
        <CartItem 
          key={i}
          item={item}
        />
      ))}
      
      <Typography>Subotal y desc: {currency(price)} -{discountPercentage}% = {currency(discountedPrice)}</Typography>
    </Fragment>
  );
}

export default CartItems;
