export const ORDER_STATUS_CONFIRMED = "confirmed";
export const ORDER_STATUS_REQUESTED = "requested";
export const ORDER_STATUS_ACCEPTED = "accepted";
export const ORDER_STATUS_DISPATCHED = "dispatched";
export const ORDER_STATUS_ARRIVED = "arrived";
export const ORDER_STATUS_REJECTED = "rejected";
export const ORDER_STATUS_FAILED = "failed";

let i=0;

export const orderStatusMap = {
  [ORDER_STATUS_REJECTED]: {
    value: i++,
    label: "Rechazado"
  },
  [ORDER_STATUS_FAILED]: {
    value: i++,
    label: "Fallido"
  },
  [ORDER_STATUS_REQUESTED]: {
    value: i++,
    label: "Solicitado"
  },
  [ORDER_STATUS_CONFIRMED]: {
    value: i++,
    label: "Confirmado"
  },
  [ORDER_STATUS_ACCEPTED]: {
    value: i++,
    label: "Aceptado"
  },
  [ORDER_STATUS_DISPATCHED]: {
    value: i++,
    label: "Salió"
  },
  [ORDER_STATUS_ARRIVED]: {
    value: i++,
    label: "Recibido"
  },
};
