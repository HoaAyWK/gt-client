export const STATUS = Object.freeze({
  ALL: 'All',
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
});

export const ORDER_STATUS = Object.freeze([
  STATUS.ALL,
  STATUS.PAID,
  STATUS.PROCESSING,
  STATUS.DELIVERED,
  STATUS.COMPLETED,
  STATUS.CANCELLED,
  STATUS.REFUNDED
]);

export const ORDER_STATUS_HISTORY = Object.freeze({
  ORDER_PLACED: 'OrderPlaced',
  PAYMENT_INFO_CONFIRMED: 'PaymentInfoConfirmed',
  ORDER_SHIPPED_OUT: 'OrderShippedOut',
  IN_TRANSIT: 'InTransit',
  ORDER_RECEIVED: 'OrderReceived',
  ORDER_COMPLETED: 'OrderCompleted',
  ORDER_CANCELLED: 'OrderCancelled',
});

export const ORDER_STATUS_LABEL = Object.freeze({
  [ORDER_STATUS_HISTORY.ORDER_PLACED]: 'Order Placed',
  [ORDER_STATUS_HISTORY.PAYMENT_INFO_CONFIRMED]: 'Payment Info Confirmed',
  [ORDER_STATUS_HISTORY.ORDER_SHIPPED_OUT]: 'Order Shipped Out',
  [ORDER_STATUS_HISTORY.IN_TRANSIT]: 'In Transit',
  [ORDER_STATUS_HISTORY.ORDER_RECEIVED]: 'Order Received',
  [ORDER_STATUS_HISTORY.ORDER_COMPLETED]: 'Order Completed',
  [ORDER_STATUS_HISTORY.ORDER_CANCELLED]: 'Order Cancelled',
});
