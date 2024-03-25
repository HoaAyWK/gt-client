import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, Popover, Stack, Typography } from '@mui/material';


import { StyledPaper } from '../components/styles';
import { getCommentsByProduct, refresh, selectAllComments } from './comments/commentSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import CommentForm from './comments/CommentForm';
import { Iconify } from '../../../components';
import Comments from './Comments';

const CommentSection = ({ productId }) => {
  const dispatch = useDispatch();
  const [showNumber, setShowNumber] = useState(5);
  const [page, setPage] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const [sortByNewest, setSortByNewest] = useState(true);
  const [anchorSortByElement, setAnchorSortByElement] = useState(null);
  const openSortByPopover = Boolean(anchorSortByElement);
  const anchorSortById = open ? 'sort-by-popover' : undefined;

  const comments = useSelector(selectAllComments);
  const { getCommentsByProductStatus, createCommentStatus, totalItems } = useSelector((state) => state.comments);

  const canShowMore = useMemo(() => {
    if (showNumber >= totalItems) {
      return false;
    }

    return true;
  }, [showNumber, totalItems]);

  useEffect(() => {
    dispatch(refresh());
    dispatch(getCommentsByProduct({ productId, num: 5, page, sortByNewest }));
  }, [productId, sortByNewest]);

  useEffect(() => {
    dispatch(getCommentsByProduct({ productId, num: 5, page, sortByNewest }));
  }, [page]);

  useEffect(() => {
    if (createCommentStatus === ACTION_STATUS.SUCCEEDED) {
      setPage(1)
      dispatch(refresh());
      dispatch(getCommentsByProduct({ productId, num: 5, page: 1, sortByNewest }));
    }
  }, [createCommentStatus]);

  const handleShowMore = () => {
    setShowNumber(prev => prev + 5);
    setPage(prev => prev + 1);
  };

  const handleClickSortBy = (event) => {
    setAnchorSortByElement(event.currentTarget);
  };

  const handleCloseSortByPopover = () => {
    setAnchorSortByElement(null);
  };

  const handleClickSortByNewest = () => {
    if (sortByNewest) {
      handleCloseSortByPopover();
      return;
    }

    setSortByNewest(true);
    handleCloseSortByPopover();
  };

  const handleClickSortByOldest = () => {
    if (!sortByNewest) {
      handleCloseSortByPopover();
      return;
    }

    setSortByNewest(false);
    handleCloseSortByPopover();
  };

  return (
    <Box
        sx={{ width: '100%', my: 4 }}
      >
        <StyledPaper sx={{ p: 2 }}>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='h5' component='h1'>
              Comments
            </Typography>
            <Box>
              <Button
                size='small'
                color='inherit'
                aria-describedby={anchorSortById}
                onClick={handleClickSortBy}
              >
                <Iconify icon='material-symbols:sort-rounded' width={20} height={20} />
                &nbsp;
                Sort by
              </Button>
              <Popover
                id={anchorSortById}
                open={openSortByPopover}
                anchorEl={anchorSortByElement}
                onClose={handleCloseSortByPopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Stack spacing={0.5} sx={{ width: 90 }}>
                  <Button
                    color={sortByNewest ? 'primary' : 'inherit'}
                    size='small'
                    onClick={handleClickSortByNewest}
                  >
                    Newest
                  </Button>
                  <Button
                    color={!sortByNewest ? 'primary' : 'inherit'} size='small'
                    onClick={handleClickSortByOldest}
                  >
                    Oldest
                  </Button>
                </Stack>
              </Popover>
            </Box>
          </Box>
          {user && (
            <Stack spacing={2} direction='row'>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alginItems: 'center',
                }}
              >
                <Avatar src={user.avatar} sx={{ width: 48, height: 48 }} />
              </Box>
              <CommentForm userId={user.id} productId={productId} />
            </Stack>
          )}
          <Comments
            user={user}
            comments={comments}
            status={getCommentsByProductStatus}
            canShowMore={canShowMore}
            onShowMore={handleShowMore}
          />
        </StyledPaper>
    </Box>
  );
};

export default CommentSection;
