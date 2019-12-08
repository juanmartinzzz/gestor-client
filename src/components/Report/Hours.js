import React from "react";
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Card, CardContent } from "@material-ui/core";
import { Row } from "./Row";
import { ReportCard } from "./components";

export const Hours = ({hours}) => {
  if(!hours || hours.length === 0) {
    return null;
  }

  return (
    <ReportCard>
      <CardContent>
        <Typography variant="h6">Pedidos por hora</Typography>
    
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell variant="footer">Hora</TableCell>
              <TableCell variant="footer" align="right"># Pedidos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(hours).map(hour => (
              <Row name={hour} value={hours[hour]} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </ReportCard>
  ) 
}

