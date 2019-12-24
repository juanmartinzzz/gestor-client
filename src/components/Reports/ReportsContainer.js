import React, { useState, useEffect } from "react";
import { withFirebase } from "../FirebaseContext";
import Reports from "./Reports";
import { fetchReports } from "../../services/entities/report";
import { getCurrentMonth, monthNameMap } from "../../services/datetime/date";

const ReportsContainer = ({ firebase }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports({setReports, firebase});
  }, []);

  const monthReport = {
    id: monthNameMap[month],
    orders: 0,
    numberUniqueClients: 0,
    totalPriceBeforeDiscount: 0,
    averagePriceBeforeDiscount: 0,
    hours: {},
    clients: {},
    products: {},
    ratings: [],
    comments: [],
    averageRating: [],
  };

  reports.map(report => {
    monthReport.orders += report.orders;
    monthReport.totalPriceBeforeDiscount += report.totalPriceBeforeDiscount;
    monthReport.ratings = monthReport.ratings.concat(report.ratings);
    monthReport.comments = monthReport.comments.concat(report.comments);

    Object.keys(report.hours).map(key => {
      monthReport.hours[key] = monthReport.hours[key] ? monthReport.hours[key]+report.hours[key] : report.hours[key];
    })

    Object.keys(report.clients).map(key => {
      monthReport.clients[key] = monthReport.clients[key] ? monthReport.clients[key]+report.clients[key] : report.clients[key];
    })

    Object.keys(report.products).map(key => {
      monthReport.products[key] = monthReport.products[key] ? monthReport.products[key]+report.products[key] : report.products[key];
    })
  })

  const totalRating = monthReport.ratings.reduce(
    (sum, rating) => sum + rating,
    0,
  );

  monthReport.numberUniqueClients = Object.keys(monthReport.clients).length;
  monthReport.averageRating = (totalRating/monthReport.ratings.length).toFixed(1);
  monthReport.averagePriceBeforeDiscount = (monthReport.totalPriceBeforeDiscount/monthReport.orders);

  return (
    <Reports
      month={month}
      reports={reports}
      monthReport={monthReport}
      handleChangeMonth={handleChangeMonth}
    />
  );
};

export default withFirebase(ReportsContainer);