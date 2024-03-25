import React from 'react';
import { Box, Button, CircularProgress, Stack } from '@mui/material';

import discuss from '../../../assets/images/discuss.png';
import MessageForEmptyItem from './components/MessageForEmptyItem';
import ACTION_STATUS from '../../../constants/actionStatus';
import CommentWithReply from './comments/comment';

const Comments = ({ status, comments, canShowMore, onShowMore, user }) => {
  if (status === ACTION_STATUS.IDLE ||
      status === ACTION_STATUS.LOADING) {

    return (
      <Box sx={{ py: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === ACTION_STATUS.FAILED) {
    return <></>;
  }

  return (
    <Box sx={{ px: 2, pb: 2 }}>
      {comments.length === 0 ? (
        !user && (
          <MessageForEmptyItem image={discuss} message='This product does not have any comments.' />
        )
      ) : (
        <Stack spacing={2}>
          {comments.map((comment) => (
            <CommentWithReply currentUser={user} key={comment.id} comment={comment} />
          ))}
        </Stack>
      )}
      {canShowMore && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            my: 1
          }}
        >
          <Button onClick={onShowMore}>
            Show more
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Comments;
