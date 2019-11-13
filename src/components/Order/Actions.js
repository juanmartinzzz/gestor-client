import React from "react";
import {
  orderStatusMap,
  ORDER_STATUS_ACCEPTED
} from "../Orders/orderStatus";
import { CardActions, Button } from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import Motorcycle from "@material-ui/icons/MotorcycleTwoTone";

export const Actions = ({ order, setOrderStatus }) => {
  const { status } = order;

  const handleClick = status => () => {
    setOrderStatus(order, status);
  };

  return (
    <CardActions>
      <Button
        variant="contained"
        startIcon={<Check />}
        onClick={handleClick("accepted")}
        disabled={status === ORDER_STATUS_ACCEPTED}
      >
        {orderStatusMap["accepted"].label}
      </Button>
      <Button
        variant="contained"
        endIcon={<Motorcycle />}
        onClick={handleClick("dispatched")}
        disabled={status !== ORDER_STATUS_ACCEPTED}
      >
        {orderStatusMap["dispatched"].label}
      </Button>
    </CardActions>
  );
};
