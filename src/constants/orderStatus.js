export const STATUS = Object.freeze({
  ALL: 'All',
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  PAID: 'Paid',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
});

export const ORDER_STATUS = Object.freeze([
  STATUS.ALL,
  STATUS.PAID,
  STATUS.PROCESSING,
  STATUS.DELIVERED,
  STATUS.CANCELLED
]);
