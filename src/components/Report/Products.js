import React from "react";
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, CardContent } from "@material-ui/core";
import { ReportCard } from "./components";
import { Row } from "./Row";

export const Products = ({ products }) => {
  if(!products || products.length === 0) {
    return null;
  }

  const orderedProdutKeys = Object.keys(products).sort((a, b) => products[a] < products[b]);

  return (
    <ReportCard>
      <CardContent>
        <Typography variant="h6">Productos</Typography>
    
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell variant="footer">Producto</TableCell>
              <TableCell variant="footer" align="right"># vendidos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedProdutKeys.map((name) => (
              <Row name={name} value={products[name]} key={name} />
            ))}
          </TableBody>
        </Table>
     </CardContent>
    </ReportCard>
  ) 
}

