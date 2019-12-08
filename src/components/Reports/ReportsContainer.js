import React, { useState, useEffect } from "react";
import { withFirebase } from "../FirebaseContext";
import Reports from "./Reports";
import { fetchReports } from "../../services/entities/report";

const ReportsContainer = ({ firebase }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports({setReports, firebase});
  }, []);

  return (
    <Reports reports={reports} />
  )
}

export default withFirebase(ReportsContainer);