import React from "react";
import { UserAvatar } from "./components";
import { CardHeader, Link, CircularProgress } from "@material-ui/core";
import { ORDER_STATUS_REQUESTED } from "./orderStatus";

export const Header = ({ status, name, phone }) => (
  <CardHeader
    title={name}
    action={status === ORDER_STATUS_REQUESTED && <CircularProgress color="secondary" />}
    avatar={<UserAvatar phone={phone}>{name[0]}</UserAvatar>}
    subheader={
      <Link
        target="_blank"
        href={`http://api.whatsapp.com/send?phone=57${phone}`}
        variant="body1"
        color="secondary"
      >
        {phone}
      </Link>
    }
  />
);
