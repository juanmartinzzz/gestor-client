import React, { useState, useEffect, Fragment } from "react";
import { withFirebase } from "../FirebaseContext";
import Reports from "./Reports";
import { fetchReports } from "../../services/entities/report";
import { getCurrentMonth, monthNameMap, getCurrentYear } from "../../services/datetime/date";

const ReportsContainer = ({ firebase, sectionIndex }) => {
  const [reports, setReports] = useState([]);
  const [date, setDate] = useState({year: getCurrentYear(), month: getCurrentMonth()});

  const dateAndActions = {
    date,
    handleChangeYear: ({ target }) => setDate({...date, year: target.value}),
    handleChangeMonth: ({ target }) => setDate({...date, month: target.value}),
  }
  useEffect(() => {
    const { year, month } = date;
    fetchReports({ setReports, firebase, year, month });
  }, [date]);

  if (sectionIndex !== 1) {
    return <Fragment />;
  }

  // TODO: persist on Firebase instead of calculating every time. Show button to expand individual days.
  // TODO: move raw data to Airtable or Google Sheets
  const monthReport = {
    id: monthNameMap[date.month],
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
      return null;
    })

    Object.keys(report.clients).map(key => {
      monthReport.clients[key] = monthReport.clients[key] ? monthReport.clients[key]+report.clients[key] : report.clients[key];
      return null;
    })

    Object.keys(report.products).map(key => {
      monthReport.products[key] = monthReport.products[key] ? monthReport.products[key]+report.products[key] : report.products[key];
      return null;
    })

    return null;
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
      reports={reports}
      monthReport={monthReport}
      dateAndActions={dateAndActions}
    />
  );
};

export default withFirebase(ReportsContainer);
