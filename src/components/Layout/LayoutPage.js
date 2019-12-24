import React, { useState } from "react";
import { SwipeableViewsWithMargin } from "../components";
import { CssBaseline, Tabs, Tab } from "@material-ui/core";
import OrdersContainer from "../Orders";
import ReportsContainer from "../Reports";

const LayoutPage = ({ loading }) => {
  const [value, setValue] = useState(1);

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
        <OrdersContainer sectionIndex={value} />
        <ReportsContainer sectionIndex={value} />
      </SwipeableViewsWithMargin>
    </CssBaseline>
  );
};

export default LayoutPage;
