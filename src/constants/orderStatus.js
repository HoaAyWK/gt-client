export const STATUS = Object.freeze({
  ALL: 'All',
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  PAID: 'Paid',
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
  ORDER_COMPLETED: 'OrderCompleted'
});
