import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { currency } from "../../services/formatter/formatter";
import { applyDiscountPercentage } from "../../services/transformer/transformer";
import { getTotalCost } from "../../services/calculations/cart";

const CartItem = ({ item }) => {
  const { main } = item;

  return (
    <Typography variant="h6">
      {main.pieces} {main.name}: {currency(main.price)}
    </Typography>
  );
};

const SubtotalAndTotal = ({ price, discountPercentage }) => (
  <Typography variant="h5" color="secondary">
    {discountPercentage
      ? `Subotal y desc: ${currency(
          price,
        )} -${discountPercentage}% = ${currency(
          applyDiscountPercentage(price, discountPercentage),
        )}`
      : `Subotal: ${currency(price)}`}
  </Typography>
);

const CartItems = ({ cart }) => (
  <Fragment>
    {cart.items.map((item, i) => (
      <CartItem key={i} item={item} />
    ))}

    <SubtotalAndTotal price={getTotalCost(cart.items)} />
  </Fragment>
);

export default CartItems;
