import React from "react";
import { Table, TableBody, TableRow, TableCell, Paper, TableHead, Typography } from "@material-ui/core";
import { getHumanUtcDate } from "../../services/formatter/formatter";

const Miles = ({ pointEntries }) => (
  <Paper>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell colSpan={99}>Puntos (ganados o redimidos)</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {pointEntries.map(pointEntry => (
          <TableRow>
            <TableCell>{getHumanUtcDate({date: new Date(pointEntry.created && pointEntry.created.seconds * 1000)})}</TableCell>
            <TableCell align="right">{pointEntry.points}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell align="right">
            <Typography color="secondary">{pointEntries.reduce((sum, pointEntry) => (sum + pointEntry.points), 0)}</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Paper>
)

export default Miles;