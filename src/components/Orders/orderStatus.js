export const ORDER_STATUS_CONFIRMED = 'confirmed';
export const ORDER_STATUS_ACCEPTED = 'accepted';
export const ORDER_STATUS_DISPATCHED = 'dispatched';
export const ORDER_STATUS_ARRIVED = 'arrived';

export const orderStatusMap = {
  [ORDER_STATUS_CONFIRMED]: {
    value: 3,
    label: "Confirmado",
  },
  [ORDER_STATUS_ACCEPTED]: {
    value: 4,
    label: "Aceptado",
  },
  [ORDER_STATUS_DISPATCHED]: {
    value: 5,
    label: "Salió",
  },
  [ORDER_STATUS_ARRIVED]: {
    value: 6,
    label: "Recibido",
  },
} 