import React, { Fragment } from "react";
import { CardDivider } from "../components";
import { Typography } from "@material-ui/core";

export const Feedback = ({rating, comments}) => {
  if(!rating && !comments) {
    return null;
  }

  return (
    <Fragment>
      <CardDivider />
  
      <Typography variant="subtitle2">{rating}</Typography>
      <Typography variant="subtitle2">{comments}</Typography>
    </Fragment>
  )
}