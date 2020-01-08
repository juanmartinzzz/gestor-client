import React, { useState } from "react";
import {
  Typography,
  Grid,
  Collapse,
  Button,
  TableBody,
  Paper,
} from "@material-ui/core";
import { currency } from "../../services/formatter/formatter";
import { Comments } from "./Comments";
import { Products } from "./Products";
import { Hours } from "./Hours";
import { ReportTable } from "./components";
import { Row } from "./Row";

const Report = ({ report }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Typography variant="h6">{report.id}</Typography>

      <Paper>
        <ReportTable size="small">
          <TableBody>
            <Row name="Pedidos" value={report.orders} />
            <Row name="Clientes únicos" value={report.numberUniqueClients} />
            <Row
              name="Total vendido"
              value={currency(report.totalPriceBeforeDiscount)}
            />
            <Row
              name="Pedido promedio"
              value={currency(report.averagePriceBeforeDiscount)}
            />
            <Row name="Ratings recibidos" value={report.ratings.length} />
            <Row name="Rating promedio" value={report.averageRating} />
          </TableBody>
        </ReportTable>
      </Paper>

      <Button onClick={handleExpandClick} size="small">
        Detalles
      </Button>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Products products={report.products} />

        <Hours hours={report.hours} />

        <Comments comments={report.comments} />
      </Collapse>
    </Grid>
  );
};

export default Report;
