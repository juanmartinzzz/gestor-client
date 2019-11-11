import React, { useState } from "react";
import { withFirebase } from "../FirebaseContext";
import Orders from "./Orders";

const OrdersContainer = ({ firebase }) => {
  const [orders, setOrders] = useState([]);

  // onMount
  React.useEffect(() => {
    const unsubscribeToListener = firebase.onCollection("orders", {
      orderBy: ["created-desc"],
      onSnapshot: orders => setOrders(orders)
    });

    return () => unsubscribeToListener();
  }, []);

  function setOrderStatus(order, status) {
    firebase.set({
      path: "orders",
      doc: order.id,
      data: {
        ...order,
        status
      }
    });
  }

  return <Orders orders={orders} setOrderStatus={setOrderStatus} />;
};

export default withFirebase(OrdersContainer);
