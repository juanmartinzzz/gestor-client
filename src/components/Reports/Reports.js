import React from "react";
import { Container, Grid } from "@material-ui/core";
import Report from "../Report/Report";

const Reports = ({ reports }) => (
  <Container maxWidth="lg">
    <Grid container spacing={10}>
      {reports.map((report, i) => {
        return <Report key={i} report={report} />
      })}
    </Grid>
  </Container>
);

export default Reports;