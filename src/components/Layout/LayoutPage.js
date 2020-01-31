import React, { useState } from "react";
import { SwipeableViewsWithMargin } from "../components";
import { CssBaseline, Tabs, Tab } from "@material-ui/core";
import OrdersContainer from "../Orders";
import ReportsContainer from "../Reports";

const LayoutPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, value) => setValue(value);
  const handleChangeIndex = index => setValue(index);

  return (
    <CssBaseline>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Pedidos"></Tab>
        <Tab label="Estadísticas"></Tab>
      </Tabs>

      <SwipeableViewsWithMargin
        axis="x"
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {(value === 0) ? <OrdersContainer sectionIndex={value} /> : <div />}
        {(value === 1) ? <ReportsContainer sectionIndex={value} /> : <div />}
      </SwipeableViewsWithMargin>
    </CssBaseline>
  );
};

export default LayoutPage;
