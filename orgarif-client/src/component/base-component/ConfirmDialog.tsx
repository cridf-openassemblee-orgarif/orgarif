/** @jsxImportSource @emotion/react */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import Button from '@mui/material/Button';
import { ButtonTypeMap } from '@mui/material/Button/Button';
import * as React from 'react';
import { WorkInProgressSign } from './WorkInProgressSign';
import { css } from '@emotion/react';

// TODO remove ? is used ?
export const ConfirmDialog = (props: {
  title: string;
  message: string;
  confirmButtonLabel: string;
  confirmButtonColor: ButtonTypeMap['props']['color'];
  display: boolean;
  onConfirm: () => void;
  onClose: () => void;
  // TODO remove
  isWip: boolean;
}) => {
  return (
    <Dialog open={props.display} onClose={props.onClose} fullWidth={true}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <div>
          {props.isWip && (
            <div
              css={css`
                margin: 10px 0;
              `}
            >
              <WorkInProgressSign />
            </div>
          )}
          {props.message}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Annuler
        </Button>
        <Button
          variant="contained"
          color={props.confirmButtonColor}
          onClick={props.onConfirm}
        >
          {props.confirmButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
