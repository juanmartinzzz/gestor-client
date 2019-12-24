import React from "react";
import { OrderHeader, UserAvatar } from "./components";
import { Link, CircularProgress } from "@material-ui/core";
import { ORDER_STATUS_REQUESTED, orderStatusMap } from "../Orders/orderStatus";

export const Header = ({ status, name, phone }) => (
  <OrderHeader
    title={name}
    action={
      status === ORDER_STATUS_REQUESTED && (
        <CircularProgress color="secondary" />
      )
    }
    avatar={<UserAvatar phone={phone}>{name[0].toUpperCase()}</UserAvatar>}
    subheader={
      <Link
        target="_blank"
        href={`http://api.whatsapp.com/send?phone=57${phone}&text="${orderStatusMap[
          status
        ].whatsapp.replace("-nombre-", name.split(" ")[0])}"`}
        variant="body1"
        color="secondary"
      >
        {phone}
      </Link>
    }
  />
);
