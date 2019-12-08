import { daysOfMonth, getDateFromTimestamp, getDateString, getCurrentDayOfMonth, getCurrentYear, getCurrentMonth } from "../datetime/date";
import { getTotalPriceFromCartBeforeDiscount } from "../calculations/cart";

export const fetchReports = async ({month = getCurrentMonth(), setReports, firebase}) => {
  const reports = await Promise.all(daysOfMonth.map(day => {
    if(day < getCurrentDayOfMonth()) {
      const dayString = day.toString().padStart(2, '0');
      const dateString = `${getCurrentYear()}-${month}-${dayString}T00:00:00`;
      const date = new Date(dateString);
      
      return getReport({date, firebase});
    }
  }));
        
  setReports(reports.filter(report => report));
}

export const getReport = async ({date = new Date(), firebase}) => {
  const report = await firebase.getDocument({path: "reports/daily/reports", document: getDateString(date)});

  if(report) {
    return report;
  }

  const nextDay = new Date(date);
  nextDay.setHours(nextDay.getHours()+24);

  const orders = await firebase.getList({
    path: "orders",
    orderBy: ["created-desc"],
    limit: 999,
    where: [
      ["created", ">", date],
      ["created", "<", nextDay],
    ]
  })

  if(!orders || orders.length === 0) {
    return;
  }

  const newReport = createNewReport({orders, firebase});

  firebase.set({
    path: "reports/daily/reports",
    document: getDateString(date),
    data: newReport,
  })

  return newReport;
}

const createNewReport = ({orders}) => {
  const newReport = {
    orders: orders.length,
    totalPriceBeforeDiscount: 0,
    hours: {},
    clients: {},
    products: {},
    ratings: [],
    comments: [],
    numberUniqueClients: 0,
    averageRating: [],
    averagePriceBeforeDiscount: 0,
  }

  orders.map(order => {
    newReport.totalPriceBeforeDiscount += getTotalPriceFromCartBeforeDiscount(order.cart);

    const userEmail = order.userInfo.email;
    newReport.clients[userEmail] = newReport.clients[userEmail] ? newReport.clients[userEmail]+1 : 1;

    const orderedAtHour = getDateFromTimestamp(order.created).getHours();
    newReport.hours[orderedAtHour] = newReport.hours[orderedAtHour] ? newReport.hours[orderedAtHour]+1 : 1;

    order.cart.items.map(({product}) => {
      newReport.products[product.name] = newReport.products[product.name] ? newReport.products[product.name]+1 : 1;
    });

    if(order.rating) {
      newReport.ratings.push(order.rating);
    }

    if(order.comments) {
      newReport.comments.push({
        name: order.userInfo.name,
        email: order.userInfo.email,
        rating: order.rating,
        comments: order.comments,
      });
    }
  })
  
  newReport.numberUniqueClients = Object.keys(newReport.clients).length;
  const totalRating = newReport.ratings.reduce((sum, rating) => (sum + rating), 0);
  newReport.averageRating = (totalRating/newReport.ratings.length).toFixed(1);
  newReport.averagePriceBeforeDiscount = newReport.totalPriceBeforeDiscount/newReport.orders;

  return newReport;
}