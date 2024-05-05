import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';

import ACTION_STATUS from '../../constants/actionStatus';

const ConfirmDialogV2 = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, status, onConfirm } = props;

  const handleClickConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
      <DialogActions>
        <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
          <Button variant='contained' color='inherit' onClick={handleClose}>Cancel</Button>
          <LoadingButton
            variant='contained'
            color='primary'
            onClick={handleClickConfirm}
            loading={status === ACTION_STATUS.LOADING ? true : false}
          >
            Confirm
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialogV2;
