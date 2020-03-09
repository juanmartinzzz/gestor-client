import React, { Fragment } from "react";
import styled from "styled-components";
import { Typography, TableBody, TableRow, TableCell, Table, Paper } from "@material-ui/core";
import { currency } from "../../services/formatter/formatter";
import { getTotalCost } from "../../services/calculations/cart";
import { getVariantImagePathname } from "../../state/Variant";

const StyledPaper = styled(Paper)`
  margin: 16px 0;
`;

const Image = styled.img`
  width: 36px;
  min-width: 36px;
  height: 36px;
  min-height: 36px;
  border-radius: 999px;
`;

const CartItem = ({ item }) => {
  const { main } = item;
  const { price, priceWithDiscount } = main;

  return (
    <TableRow>
      <TableCell>
        <Image
          src={getVariantImagePathname({ variantId: main.id })}
        />
      </TableCell>
      <TableCell>
        <Typography variant="h6">{main.name}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="h6">
          { (price !== priceWithDiscount) ? 
              <Fragment>
                <strike>
                  {currency(price)}
                </strike>
                &nbsp;
                {currency(priceWithDiscount)}
              </Fragment>
            : 
            currency(price)
          }
        </Typography>
      </TableCell>
    </TableRow>
  );
};

const SubtotalAndTotal = ({ totalCost }) => (
  <TableRow>
    <TableCell />
    <TableCell />
    <TableCell align="right">
      <Typography variant="h6" color="secondary">
        {currency(totalCost)}
      </Typography>
    </TableCell>
  </TableRow>
);

const CartItems = ({ cart }) => (
  <StyledPaper>
    <Table size="small">
      <TableBody>
        {cart.items.map((item, i) => (
          <CartItem key={i} item={item} />
        ))}
        <SubtotalAndTotal totalCost={getTotalCost(cart.items)} />
      </TableBody>
    </Table>
    
  </StyledPaper>

);

export default CartItems;
