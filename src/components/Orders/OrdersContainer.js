import React, { useState, useEffect, Fragment } from "react";
import { withFirebase } from "../FirebaseContext";
import Orders from "./Orders";
import { ORDER_STATUS_REQUESTED, ORDER_STATUS_ACCEPTED } from "./orderStatus";
import { getEmail } from "../../services/entities/email";

const OrdersContainer = ({ firebase, sectionIndex }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribeToListener = firebase.onCollection({
      path: "orders",
      orderBy: ["created-desc"],
      where: [["created", ">", new Date("2020-01-07")]],
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

      return null;
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

  const setOrderStatus = async (order, status) => {
    if(order.status === ORDER_STATUS_REQUESTED && status === ORDER_STATUS_ACCEPTED) {
      const email = await getEmail({emailAddress: order.userInfo.email, firebase});
      
      firebase.set({
        path: "emails",
        document: order.userInfo.email,
        data: {
          created: email.created,
          // TODO: create something to change an order into an order for storing in email. Actually create AddOrder method
          orders: {...email.orders, [order.id]: {created: order.created, pointEntries: order.pointEntries}},
        },
      });
    }

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
