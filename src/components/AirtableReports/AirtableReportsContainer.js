import React, { useEffect, useState } from "react";
import { getDateFromTimestamp } from "../../services/datetime/date";
import { getLocalStorageItem } from "../../services/localStorage/localStorage";
import { withFirebase } from "../FirebaseContext";
import AirtableReports from "./AirtableReports";

const regularFlow = true;
const amountOrders = 15;

const AirtableReportsContainer = ({ firebase }) => {
  const [orders, setOrders] = useState([]);

  const asyncSetOrders = async () => {
    const createdTimestamp = getLocalStorageItem("latestOrderOnAirtableReports");
    const createdDate = (regularFlow && createdTimestamp) ? getDateFromTimestamp(createdTimestamp) : new Date("2020-02-02");
    createdDate.setMinutes(createdDate.getMinutes()+1);
    
    const orders = await firebase.getList({
      path: "orders",
      orderBy: ["created-asc"],
      limit: amountOrders,
      where: [["created", ">", createdDate]],
    });

    if(orders.length > 0) {
      setOrders(orders);
    }
  }

  useEffect(() => {
    asyncSetOrders();
  }, []);

  if(orders.length === 0) {
    return null;
  }

  return (
    <AirtableReports orders={orders} />
  )
}

export default withFirebase(AirtableReportsContainer);
