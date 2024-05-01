import React, { useMemo } from 'react';
import { Box } from '@mui/material';

import OrderTimeline from './OrderTimeline';

const OrderTimelines = ({ orderStatusHistoryTrackings }) => {
  const orderStatusHistories = useMemo(() => {
    return orderStatusHistoryTrackings.toSorted(
      (a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime));
  }, [orderStatusHistoryTrackings]);

  return (
    <Box sx={{ my: 2 }}>
      {orderStatusHistories.map((orderStatusHistoryTracking, index) => (
        <OrderTimeline
          isActive={index === 0}
          key={orderStatusHistoryTracking.id}
          orderStatusHistory={orderStatusHistoryTracking}
        />
      ))}
    </Box>
  );
};

export default OrderTimelines;
