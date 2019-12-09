import React, { useState, useEffect, Fragment } from "react";
import { withFirebase } from "../FirebaseContext";
import Orders from "./Orders";
import { ORDER_STATUS_REQUESTED } from "./orderStatus";

const OrdersContainer = ({ firebase, sectionIndex }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribeToListener = firebase.onCollection({
      path: "orders",
      orderBy: ["created-desc"],
      onSnapshot: handleOrdersChange,
    });

    return () => unsubscribeToListener();
  }, []);

  const handleOrdersChange = orders => {
    let notify = false;

    orders.map(({ status }) => {
      if (
        status === ORDER_STATUS_REQUESTED &&
        Notification.permission === "granted"
      ) {
        notify = true;
      }
    });

    if (notify) {
      navigator.serviceWorker.getRegistration().then(register => {
        register.showNotification("Nuevo pedido", {
          // body: '.',
          vibrate: [1000, 500, 300],
          tag: "renotify",
          renotify: true,
        });
      });
    }

    setOrders(orders);
  };

  function setOrderStatus(order, status) {
    firebase.set({
      path: "orders",
      document: order.id,
      data: {
        ...order,
        status,
      },
    });
  }

  if (sectionIndex !== 0) {
    return <Fragment />;
  }

  return <Orders orders={orders} setOrderStatus={setOrderStatus} />;
};

export default withFirebase(OrdersContainer);
