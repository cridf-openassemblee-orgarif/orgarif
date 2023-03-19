/** @jsxImportSource @emotion/react */
import { LoadingState } from '../../interfaces';
import { clientUid } from '../../utils';
import { LoadingStateButton } from '../common/LoadingButton';
import { PasswordForm, PasswordFormInput } from './PasswordForm';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

export const UpdatePasswordDialogButton = (props: {
  onSubmit: (dto: PasswordFormInput) => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState<LoadingState>('Idle');
  const close = () => setOpen(false);
  const onSubmit = (dto: PasswordFormInput) => {
    setUpdateLoading('Loading');
    return props.onSubmit(dto).then(() => {
      close();
      setUpdateLoading('Idle');
    });
  };
  const formId = clientUid();
  return (
    <>
      <Button onClick={() => setOpen(true)}>Update password</Button>
      <Dialog
        open={open}
        onClose={close}
        maxWidth={'lg'}
        fullWidth={true}
        scroll="body"
      >
        <DialogTitle>Update password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <PasswordForm formId={formId} onSubmit={onSubmit} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>close</Button>
          <LoadingStateButton formId={formId} loadingState={updateLoading}>
            Save
          </LoadingStateButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
