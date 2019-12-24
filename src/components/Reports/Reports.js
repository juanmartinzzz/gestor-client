import React, { useState } from "react";
import { Container, Grid, Select, MenuItem } from "@material-ui/core";
import Report from "../Report/Report";
import {
  getCurrentYear,
  years,
  monthNameMap,
} from "../../services/datetime/date";

const Reports = ({ month, reports, monthReport, handleChangeMonth }) => {
  const [year, setYear] = useState(getCurrentYear());

  const handleChangeYear = ({ target }) => setYear(target.value);

  return (
    <Container maxWidth="lg">
      <Select value={year} onChange={handleChangeYear}>
        {years.map(year => (
          <MenuItem value={year} key={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Select value={month} onChange={handleChangeMonth}>
        {Object.keys(monthNameMap).map(number => (
          <MenuItem value={number} key={number}>
            {monthNameMap[number]}
          </MenuItem>
        ))}
      </Select>

      <div>&nbsp;</div>
      
      <Grid container spacing={10}>
        <Report report={monthReport} />;
        
        {reports.map((report, i) => {
          return <Report key={i} report={report} />;
        })}
      </Grid>
    </Container>
  );
};

export default Reports;
