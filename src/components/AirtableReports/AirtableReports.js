import React, { useState, useEffect, Fragment } from "react";
import { getDateFromTimestamp } from "../../services/datetime/date";
import { upsertRecord } from "../../services/airtable/write";
import { Table, TableBody, TableRow, TableCell, Paper, Container } from "@material-ui/core";
import Check from '@material-ui/icons/Check';
import { setLocalStorageItem } from "../../services/localStorage/localStorage";

const AirtableReports = ({ orders = []}) => {
  const [order, setOrder] = useState();

  useEffect(() => {
    const saveOrderInfoOnAirtableReports = ({order}) => {
      const { id, rating, comments, created, userInfo, cart } = order;
      const { email, phone, name, address, locality } = userInfo;
      const phonemail = `${email}-${phone}`;
    
      const getUserToUpsert = ({oldRecord = {}}) => {
        const { fields = {} } = oldRecord;
        const { orders = 0, items = 0, spent = 0, orderIds = '' } = fields;
        
        if(orderIds.split(',').includes(id)) {
          return;
        }
        
        return {
          phonemail,
          email,
          phone,
          name, 
          address, 
          locality,
          orderIds: `${orderIds},${id}`,
          orders: (orders + 1), 
          items: (items + cart.items.length), 
          spent: (spent + cart.items.reduce((sum, item) => (sum + item.main.price), 0)) 
        }
      }
    
      const getOrderToUpsert = () => ({
        token: id,
        phonemail,
        rating,
        comments, 
        items: cart.items.length, 
        products: cart.items.map(item => item.main.name).join(", "), 
        cost: cart.items.reduce((sum, item) => (sum + item.main.price), 0), 
        created: getDateFromTimestamp(created),
      })
    
      cart.items.map(item => {
        const getProductToUpsert = ({oldRecord = {}}) => {
          const { fields = {} } = oldRecord;
          const { bought = 0, orderIds = '' } = fields;
        
          if(orderIds.split(',').includes(id)) {
            return;
          }
    
          return {
            name: item.main.name,
            bought: (bought + 1),
            orderIds: `${orderIds},${id}`,
          }
        }
    
        upsertRecord({
          baseId: "appk1OrIpYUllCn9h",
          table: "products",
          view: "grid",
          getNewRecord: getProductToUpsert,
          filterByFormula: `{name} = '${item.main.name}'`
        });
  
        return null;
      })
    
      upsertRecord({
        baseId: "appk1OrIpYUllCn9h",
        table: "users",
        view: "grid",
        getNewRecord: getUserToUpsert,
        filterByFormula: `{phonemail} = '${phonemail}'`
      });
    
      upsertRecord({
        baseId: "appk1OrIpYUllCn9h",
        table: "orders",
        view: "grid",
        getNewRecord: getOrderToUpsert,
        filterByFormula: `{token} = '${id}'`
      });
  
      setLocalStorageItem("latestOrderOnAirtableReports", order.created)
    }

    orders.map((order, i) => {
      return setTimeout(() => {
        setOrder(order);
        saveOrderInfoOnAirtableReports({order});
      }, 8 * 1000 * i);
    })
  }, []);

  if(!order) {
    return null;
  }

  return (

    <Container maxWidth="xs">
      <Paper>
        <Table size="small">
          <TableBody>
            {orders.map((iterateOrder, i) => {
              const isCurrentOrder = iterateOrder.created.seconds === order.created.seconds;

              return (
                <Fragment key={i}>
                  <TableRow>
                    <TableCell>{i}</TableCell>
                    <TableCell>
                      {getDateFromTimestamp(iterateOrder.created).toLocaleString()}
                    </TableCell>
                      <TableCell>
                        {iterateOrder.userInfo.name}
                      </TableCell>
                    <TableCell align="right">
                      {iterateOrder.created.seconds <= order.created.seconds && <Check color="secondary" fontSize="small" /> }
                    </TableCell>
                  </TableRow>
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  )
}

export default AirtableReports;
