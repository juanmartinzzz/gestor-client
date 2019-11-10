import React from "react";
import SwipeableViews from "react-swipeable-views";
import { CssBaseline, Tabs, Tab } from "@material-ui/core";
import OrdersContainer from "../Orders/OrdersContainer";

const LayoutPage = ({ loading }) => {
  const [value, setValue] = React.useState(0);

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
        <Tab label="Calificaciones"></Tab>
      </Tabs>

      <SwipeableViews axis="x" index={value} onChangeIndex={handleChangeIndex}>
        <OrdersContainer />
        <div>B</div>
      </SwipeableViews>
    </CssBaseline>
  );
};

export default LayoutPage;
