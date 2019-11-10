import React, { useState } from "react";
import LayoutPage from "./LayoutPage";

const LayoutContainer = ({ cart }) => {
  const [loading, setLoading] = useState(true);

  // onMount
  React.useEffect(() => {
    // setLoading(false);
  }, []);

  return (
    <LayoutPage
      loading={loading}
    />
  );
};

export default LayoutContainer;
