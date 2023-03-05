/** @jsxImportSource @emotion/react */
import { state } from '../../../state/state';
import { emptyFilters } from '../../../utils/filters';
import { colors } from '../../styles/colors';
import { css } from '@emotion/react';
import { DeleteOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

export const DeleteFiltersDialog = () => {
  const setFilters = useSetRecoilState(state.filters);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        size="small"
        css={css`
          background-color: ${colors.white};
          color: ${colors.dark};
          right: 0;
          border-radius: 50px;
          min-width: max-content;
          align-self: center;
          margin-left: auto;
          padding: 0 1rem;
          box-shadow: 0 5px 10px 0 rgba(191, 191, 191, 0.4);
        `}
        component="button"
        onClick={() => setOpenDialog(true)}
      >
        Effacer les filtres
        <DeleteOutlined sx={{ fontSize: 16, marginLeft: '5px' }} />
      </Button>
      {/*<Button
        variant="contained"
        size="small"
        css={css`
          background-color: ${colors.white};
          color: ${colors.dark};
          border-radius: 50px;
          height: 30px;
          width: 100%;
          align-self: center;
          margin-top: 12px;
          padding: 0 1rem;
          box-shadow: 0 5px 10px 0 rgba(191, 191, 191, 0.4);
        `}
        component="button"
        onClick={() => setOpenDialog(true)}
      >
        Effacer les filtres
        <DeleteOutlined
          sx={{
            fontSize: 20,
            marginLeft: '8px'
          }}
        />
      </Button>*/}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: '20px',
            width: '100%'
          }
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          css={css`
            padding: 24px 48px;
            text-transform: uppercase;
          `}
        >
          Effacer les filtres
        </DialogTitle>
        <DialogContent
          css={css`
            padding: 20px 48px;
          `}
        >
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir effacer tous les filtres ?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          css={css`
            align-self: center;
            padding-bottom: 16px;
          `}
        >
          <Button
            css={css`
              border-radius: 40px;
              padding: 2px 32px;
            `}
            variant="contained"
            color="secondary"
            onClick={() => {
              setFilters(emptyFilters);
              setOpenDialog(false);
            }}
          >
            Oui
          </Button>
          <Button
            css={css`
              border-radius: 40px;
              padding: 2px 32px;
            `}
            variant="outlined"
            color="secondary"
            onClick={() => setOpenDialog(false)}
          >
            Non
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
