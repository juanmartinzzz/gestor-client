import React from "react";
import Location from "./Location";
import { Container, Grid } from "@material-ui/core";

const Locations = ({ locations, setLocationOpen }) => (
  <Container maxWidth="lg">
    <Grid container spacing={2}>
      {locations.map(location => (
        <Grid item xs={6} key={location.id}>
          <Location location={location} setLocationOpen={setLocationOpen} />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default Locations;
