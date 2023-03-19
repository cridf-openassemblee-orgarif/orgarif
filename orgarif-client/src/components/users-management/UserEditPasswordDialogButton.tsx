/** @jsxImportSource @emotion/react */
import { UserId } from '../../generated/domain/fmk-ids';
import { LoadingState } from '../../interfaces';
import { appContext } from '../../services/ApplicationContext';
import { clientUid } from '../../utils';
import { PasswordForm, PasswordFormInput } from '../account/PasswordForm';
import { LoadingStateButton } from '../common/LoadingButton';
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

export const UserEditPasswordDialogButton = (props: { userId: UserId }) => {
  const [updateLoading, setUpdateLoading] = useState<LoadingState>('Idle');
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const save = (dto: PasswordFormInput) => {
    setUpdateLoading('Loading');
    return appContext
      .commandService()
      .send({
        objectType: 'AdminUpdatePasswordCommand',
        userId: props.userId,
        password: dto.password
      })
      .then(() => {
        setUpdateLoading('Idle');
        close();
      });
  };
  const formId = clientUid();
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outlined">edit</Button>
      <Dialog
        open={open}
        onClose={close}
        maxWidth={'lg'}
        fullWidth={true}
        scroll="body"
      >
        <DialogTitle>Edit password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <PasswordForm formId={formId} onSubmit={save} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>close</Button>
          <LoadingStateButton loadingState={updateLoading} formId={formId}>
            Save
          </LoadingStateButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
