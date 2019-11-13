import React from "react";
import { Container } from "@material-ui/core";
import Order from "../Order";

const Orders = ({ orders, setOrderStatus }) => (
  <Container maxWidth="md">
    {orders.map((order, i) => {

      return (
        <Order 
          key={i}
          order={order}
          setOrderStatus={setOrderStatus}
        />
      );
    })}
  </Container>
);

export default Orders;
