import React, { Fragment } from "react";
import { CardDivider } from "../components";
import { Typography } from "@material-ui/core";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";

const RatingStar = ({ full }) =>
  full ? (
    <Star fontSize="small" color="secondary" />
  ) : (
    <StarBorder fontSize="small" color="secondary" />
  );

export const Feedback = ({ rating, comments }) => {
  if (!rating && !comments) {
    return null;
  }

  return (
    <Fragment>
      <CardDivider />

      <Typography>
        {[1, 2, 3, 4, 5].map(index => (
          <RatingStar key={index} full={index <= rating} />
        ))}
      </Typography>
      <Typography variant="subtitle2">{comments}</Typography>
    </Fragment>
  );
};
