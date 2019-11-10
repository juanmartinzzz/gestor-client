import React from "react";
import { UserAvatar } from "./components";
import { CardHeader, Link, CircularProgress } from "@material-ui/core";

export const Header = ({status, name, phone}) => (
  <CardHeader
    title={name}
    action={(status === 'confirmed') && <CircularProgress color="secondary" />}
    avatar={<UserAvatar phone={phone}>{name[0]}</UserAvatar>}
    subheader={
      <Link 
      target="_blank" 
      href={`http://api.whatsapp.com/send?phone=57${phone}`}
      variant="body1" 
      color="secondary">
        {phone}
      </Link>
    }
  />
)