import React from "react";
import { Header } from "./Header";
import { Actions } from "./Actions";
import { Feedback } from "./Feedback";
import { OrderCard } from "./components";
import { CardDivider } from "../components";
import { orderStatusMap } from "./orderStatus";
import { CardContent, Container, Typography } from "@material-ui/core";
import { date } from "../../services/formatter";

const Orders = ({ orders, setOrderStatus }) => (
  <Container maxWidth="md">
    {
      orders.map((order, i) => {
        const { status, created, userInfo } = order;
        console.log("--created", created)

        return (
          <OrderCard key={i}>
            <Header status={status} phone={userInfo.phone} name={userInfo.name} />

            <CardContent>
              <Typography variant="subtitle1">Status: {orderStatusMap[status].label}</Typography>
              <Typography variant="subtitle2">{date(new Date(created.seconds*1000))}</Typography>
              <Typography variant="subtitle2">{userInfo.lastname}</Typography>
              <Typography variant="subtitle2">{userInfo.address}, {userInfo.locality}</Typography>
              <Typography variant="subtitle2">{userInfo.notes}</Typography>
              <Typography variant="subtitle2">{userInfo.email}</Typography>

              <CardDivider />

              <Typography variant="caption">{userInfo.addChopsticks && " · Palillos"}</Typography>
              <Typography variant="caption">{userInfo.addWasabi && " · Wasabi+Jenjibre"}</Typography>
              <Typography variant="caption">{userInfo.addTeriyaki && " · Teriyaki"}</Typography>
              <Typography variant="caption">{userInfo.addSoy && " · Soya"}</Typography>

              <Feedback rating={order.rating} comments={order.comments} />
            </CardContent>

            <Actions 
              order={order} 
              setOrderStatus={setOrderStatus} 
            />
          </OrderCard>
        )
      }
      )
    }
  </Container>
)

export default Orders;
