import React, { useState, useEffect, Fragment } from "react";
import { withFirebase } from "../FirebaseContext";
import Reports from "./Reports";
import { fetchReports } from "../../services/entities/report";
import { getCurrentMonth } from "../../services/datetime/date";

const ReportsContainer = ({ firebase, sectionIndex }) => {
  const [reports, setReports] = useState([]);
  const [month, setMonth] = useState(getCurrentMonth());

  const handleChangeMonth = ({ target }) => {
    setMonth(target.value);
  };

  useEffect(() => {
    fetchReports({ setReports, firebase, month });
  }, [month]);

  if (sectionIndex !== 1) {
    return <Fragment />;
  }

  return (
    <Reports
      reports={reports}
      month={month}
      handleChangeMonth={handleChangeMonth}
    />
  );
};

export default withFirebase(ReportsContainer);
