import React from 'react';
import { Stack, Typography } from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator
} from '@mui/lab';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

import { fDateTime } from '../../../../utils/formatTime';
import { ORDER_STATUS_LABEL } from '../../../../constants/orderStatus';

const OrderTimeline = ({ orderStatusHistory, isActive }) => {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color={isActive ? 'primary' : 'grey'} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Stack spacing={0.5}>
            <Typography variant='subtitle2' color='text.primary'>
              {ORDER_STATUS_LABEL[orderStatusHistory.status]}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {fDateTime(orderStatusHistory.createdDateTime)}
            </Typography>
          </Stack>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default OrderTimeline;
