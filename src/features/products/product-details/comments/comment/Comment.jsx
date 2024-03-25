import React, { useState, useMemo } from 'react';
import { Avatar, Box, Button, Icon, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { Iconify, Label } from '../../../../../components';
import { fToNow } from '../../../../../utils/formatTime';
import ROLES from '../../../../../constants/userRoles';
import CommentForm from '../CommentForm';
import EditForm from './EditForm';

const Comment = ({ comment, parentCommentId, avatarSize, currentUser, productId, isRoot }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [replyComment, setReplyComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleClickLike = () => {
    if (!currentUser) {
      enqueueSnackbar('Please login first!');
    }
  };

  const handleClickReply = () => {
    if (!currentUser) {
      enqueueSnackbar('Please login first!');
      return;
    }

    setReplyComment(true);
  };

  const handleClose = () => {
    setReplyComment(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Stack direction='row' spacing={2} sx={{ mb: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alginItems: 'center',
          }}
        >
          <Avatar src={comment.user.avatar} sx={{ width: avatarSize, height: avatarSize }} />
        </Box>
        <Stack spacing={0.5} sx={{ mt: 1, width: '100%' }}>
          <Stack spacing={1} direction='row' alignItems='center' >
            {currentUser?.id === comment.user.id ? (
              <Box sx={{ color: 'inherit' }}>
                <Label>{comment.user.firstName + " " + comment.user.lastName}</Label>
              </Box>
            ) : (
              <Stack spacing={0.5} direction='row' alignItems='center'>
                <Typography variant='subtitle1' color='text.primary'>
                  {comment.user.firstName + " " + comment.user.lastName}
                </Typography>
                {comment.user.role === ROLES.ADMIN && (
                  <Iconify icon='material-symbols:check-circle-rounded' width={20} height={20} color='text.secondary' />
                )}
              </Stack>
            )}
            <Typography variant='body2' color='text.secondary'>
              {fToNow(comment.createdAt)}
            </Typography>
            {comment.createdAt !== comment.modifiedAt && (
              <Typography color='text.secondary'>(edited)</Typography>
            )}
            {currentUser?.id === comment.user.id && !isEditing && (
              <Button onClick={handleEdit} size='small' >
                <Iconify icon='eva:edit-outline' width={20} height={20} />
                &nbsp;
                Edit
              </Button>
            )}
          </Stack>
          {isEditing ? (
            <EditForm comment={comment} finishEdit={handleCancelEdit} />
          ) : (
            <>
              <Typography
                variant='body1'
                color='text.primary'
              >
                {comment.content}
              </Typography>
              <Stack direction='row' spacing={1}>
                <Button size='small' color='inherit'>
                  <Iconify icon='mdi:like' width={20} height={20} />
                  &nbsp;
                  Like
                </Button>
                <Button size='small' color='inherit' onClick={handleClickReply} >
                  <Iconify icon='material-symbols:reply' width={20} height={20} />
                  &nbsp;
                  Reply
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
      {replyComment && (
        <Stack direction='row' spacing={2} sx={ isRoot && { ml: 8 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alginItems: 'center',
            }}
          >
            <Avatar src={comment.user.avatar} sx={{ width: 32, height: 32 }} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <CommentForm
              replyUserId={comment.user.id}
              reply={parentCommentId ? parentCommentId : comment.id}
              handleClose={handleClose}
            />
          </Box>
        </Stack>
      )}
    </>
  );
};

const CommentWithReply = ({ comment, currentUser }) => {
  const [showReplies, setShowReplies] = useState(false);

  const handleToggleShowReplies = () => {
    setShowReplies(prev => !prev);
  };

  const numReplies = useMemo(() => {
    if (comment?.replies?.length) {
      return comment.replies.length;
    }

    return 0;
  }, [comment]);

  return (
    <Box>
      <Comment comment={comment} currentUser={currentUser} avatarSize={48} isRoot={true} />
      {numReplies > 0 && (
        <Box sx={{ ml: 8 }}>
          <Button
            sx={{ mb: 1 }}
            onClick={handleToggleShowReplies}
          >
            <Iconify
              icon={showReplies ?
                'material-symbols:keyboard-arrow-up-rounded'
              :
                'material-symbols:keyboard-arrow-down-rounded'
              }
              width={24}
              height={24}
            />
            &nbsp;
            {`${numReplies} ${numReplies === 1 ? 'reply' : 'replies'}`}
          </Button>
          {showReplies && (
            comment.replies.map((reply) => (
              <Comment
                key={comment.id}
                comment={reply}
                avatarSize={32}
                currentUser={currentUser}
                parentCommentId={comment.id}
              />
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default CommentWithReply;
