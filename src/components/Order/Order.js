import React, { Fragment } from "react";
import { CardContent, Typography } from "@material-ui/core";
import { Header } from "./Header";
import { Actions } from "./Actions";
import { Feedback } from "./Feedback";
import { OrderCard } from "./components";
import { CardDivider } from "../components";
import { date } from "../../services/formatter/formatter";
import { orderStatusMap, ORDER_STATUS_DISPATCHED } from "../Orders/orderStatus";
import CartItems from "./CartItems";

const Order = ({ order, setOrderStatus }) => {
  const { status, created, userInfo, cart } = order;

  return (
    <OrderCard>
      <Header status={status} phone={userInfo.phone} name={userInfo.name} />

      <CardContent>
        <Typography variant="subtitle1">
          Status: {orderStatusMap[status].label}
        </Typography>

        {order.status !== ORDER_STATUS_DISPATCHED && (
          <Fragment>
            <Typography variant="subtitle2">
              {date(new Date(created && created.seconds * 1000))}
            </Typography>
            <Typography variant="subtitle2">{userInfo.lastname}</Typography>
            <Typography variant="subtitle2">
              {userInfo.address}, {userInfo.locality}
            </Typography>
            <Typography variant="subtitle2">{userInfo.notes}</Typography>
            <Typography variant="subtitle2">{userInfo.email}</Typography>

            <CardDivider />

            <CartItems cart={cart} />

            <CardDivider />

            <Typography variant="caption">
              {userInfo.addChopsticks && " · Palillos"}
              {userInfo.addTeriyaki && " · Teriyaki"}
              {userInfo.addGinger && " · Jenjibre"}
              {userInfo.addWasabi && " · Wasabi"}
              {userInfo.addSoy && " · Soya"}
            </Typography>
          </Fragment>
        )}

        <Feedback rating={order.rating} comments={order.comments} />
      </CardContent>

      <Actions order={order} setOrderStatus={setOrderStatus} />
    </OrderCard>
  );
};

export default Order;
