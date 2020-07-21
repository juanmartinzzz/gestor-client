import React from "react";
import { Grid, Select, MenuItem, Typography, FormControl, InputLabel } from "@material-ui/core";
import { PaperWithPadding } from "../components";

const Location = ({ location, setLocationOpen }) => (
  <PaperWithPadding>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">{location.id}</Typography>
      </Grid>

      <Grid item xs={6}>
        <FormControl>
          <InputLabel id="open">Abierta o cerrada</InputLabel>
          <Select
            labelId="open" 
            value={location.open} 
            onChange={({ target }) => setLocationOpen(location.id, target.value)}
          >
            <MenuItem value="2">Según el horario actual</MenuItem>
            <MenuItem value="1">ABIERTA por fuerza</MenuItem>
            <MenuItem value="0">CERRADA por fuerza</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* <Grid item xs={12}>
        <Typography variant="h5">Horario actual</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>Lunes</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>Desde</Typography>
        <KeyboardTimePicker
          test={console.log(location)}
          value={location.schedule[0]}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography>Hasta</Typography>
      </Grid> */}
    </Grid>
  </PaperWithPadding>
)

export default Location;