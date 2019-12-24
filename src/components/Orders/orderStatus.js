import { orderStatusMessages } from "../../data/orderStatusMessages";


export const ORDER_STATUS_REJECTED = "rejected";
export const ORDER_STATUS_FAILED = "failed";
export const ORDER_STATUS_PENDING = "pending";
export const ORDER_STATUS_REQUESTED = "requested";
export const ORDER_STATUS_ACCEPTED = "accepted";
export const ORDER_STATUS_DISPATCHED = "dispatched";
export const ORDER_STATUS_ARRIVED = "arrived";
 
let i = 0;

export const orderStatusMap = {
  [ORDER_STATUS_REJECTED]: {
    value: i++,
    label: orderStatusMessages[ORDER_STATUS_REJECTED].label,
    whatsapp: orderStatusMessages[ORDER_STATUS_REJECTED].whatsapp,
  },
  [ORDER_STATUS_FAILED]: {
    value: i++,
    label: orderStatusMessages[ORDER_STATUS_FAILED].label,
    whatsapp: orderStatusMessages[ORDER_STATUS_FAILED].whatsapp,
  },
  [ORDER_STATUS_PENDING]: {
    value: i++,
    label: orderStatusMessages[ORDER_STATUS_PENDING].label,
    whatsapp: orderStatusMessages[ORDER_STATUS_PENDING].whatsapp,
  },
  [ORDER_STATUS_REQUESTED]: {
    value: i++,
    label: orderStatusMessages[ORDER_STATUS_REQUESTED].label,
    whatsapp: orderStatusMessages[ORDER_STATUS_REQUESTED].whatsapp,
  },
  [ORDER_STATUS_ACCEPTED]: {
    value: i++,
    label: orderStatusMessages[ORDER_STATUS_ACCEPTED].label,
    whatsapp: orderStatusMessages[ORDER_STATUS_ACCEPTED].whatsapp,
  },
  [ORDER_STATUS_DISPATCHED]: {
    value: i++,
    label: orderStatusMessages[ORDER_STATUS_DISPATCHED].label,
    whatsapp: orderStatusMessages[ORDER_STATUS_DISPATCHED].whatsapp,
  },
  [ORDER_STATUS_ARRIVED]: {
    value: i++,
    label: orderStatusMessages[ORDER_STATUS_ARRIVED].label,
    whatsapp: orderStatusMessages[ORDER_STATUS_ARRIVED].whatsapp,
  },
};