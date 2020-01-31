import React from "react";
import { Container, Grid, Select, MenuItem } from "@material-ui/core";
import Report from "../Report/Report";
import {
  years,
  monthNameMap,
} from "../../services/datetime/date";

const Reports = ({ dateAndActions, reports, monthReport }) => (
  <Container maxWidth="lg">
    <Select value={dateAndActions.date.year} onChange={dateAndActions.handleChangeYear}>
      {years.map(year => (
        <MenuItem value={year} key={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
    
    &nbsp; &nbsp; &nbsp; &nbsp;

    <Select value={dateAndActions.date.month} onChange={dateAndActions.handleChangeMonth}>
      {Object.keys(monthNameMap).map(number => (
        <MenuItem value={number} key={number}>
          {monthNameMap[number]}
        </MenuItem>
      ))}
    </Select>

    <div>&nbsp;</div>
    
    <Grid container spacing={10}>
      <Report report={monthReport} />
      
      {reports.map((report, i) => <Report key={i} report={report} />)}
    </Grid>
  </Container>
);

export default Reports;
