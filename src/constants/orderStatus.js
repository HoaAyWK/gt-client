export const STATUS = Object.freeze({
  ALL: 'All',
  PAID: 'Paid',
  PROCESSING: 'Processing',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
});

export const ORDER_STATUS = Object.freeze([
  STATUS.ALL,
  STATUS.PAID,
  STATUS.PROCESSING,
  STATUS.DELIVERED,
  STATUS.CANCELLED
]);
