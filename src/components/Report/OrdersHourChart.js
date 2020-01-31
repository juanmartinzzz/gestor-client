import React, { Fragment } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography } from "@material-ui/core";
import Schedule from "@material-ui/icons/Schedule";


const OrdersHourChart = ({ report }) => {
  const { hours } = report;
  const data = [12,13,14,15,16,17,18,19,20,21].map(key => ({label: `${key}:00`, value: hours[key]}))

  return (
    <Fragment>
      <Typography><Schedule /> Pedidos vs Hora</Typography>
      
      <ResponsiveContainer width="100%" height={150}>
        <AreaChart 
          data={data}
        >
          <XAxis dataKey="label" stroke='#8884d8' />
          <YAxis orientation="right" stroke='#8884d8'/>
          <Tooltip />
          <Area connectNulls type='monotone' dataKey='value' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>
      </ResponsiveContainer>
    </Fragment>
  )
}

export default OrdersHourChart;