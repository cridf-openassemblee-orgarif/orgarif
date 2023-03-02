/** @jsxImportSource @emotion/react */
import { LoadingButton } from '../LoadingButton';
import { css } from '@emotion/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import * as React from 'react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export const ConfirmButton = (
  props: PropsWithChildren<{
    onConfirm: () => Promise<void>;
    color?: 'primary' | 'warning' | 'error';
    dialogTitle: string;
    dialogContent?: ReactNode;
    okButton: string;
    cancelButton: string;
  }>
) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button
        variant="contained"
        color={props.color}
        onClick={() => setOpen(true)}
        css={css`
          height: 32px;
        `}
      >
        {props.children}
      </Button>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>{props.cancelButton}</Button>
          <LoadingButton onClick={() => props.onConfirm().then(() => close())}>
            {props.okButton}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
