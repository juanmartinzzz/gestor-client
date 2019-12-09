import React from "react";
import { TableRow, TableCell, Typography } from "@material-ui/core";

export const Row = ({ name, value, footer }) => (
  <TableRow hover>
    {name && <TableCell variant={footer && "footer"}>{name}</TableCell>}
    <TableCell align={name && "right"} colSpan={name ? 1 : 2}>
      <Typography color="secondary" variant={footer ? "caption" : "subtitle1"}>
        {value}
      </Typography>
    </TableCell>
  </TableRow>
);
