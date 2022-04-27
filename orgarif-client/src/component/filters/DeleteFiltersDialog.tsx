/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { DeleteOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useSetRecoilState } from 'recoil';
import { state } from '../../state/state';
import { colors } from '../../styles/colors';

export const DeleteFiltersDialog = () => {
  const setActiveFilters = useSetRecoilState(state.activeFilters);
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <>
      <Button
        variant="contained"
        size="small"
        css={css`
          max-height: 2em;
          align-self: center;
          margin-left: 0.6em;
          margin-top: 1em;
          width: 95%;
          background-color: ${colors.errorBackground};
        `}
        component="button"
        onClick={() => setOpenDialog(true)}
      >
        Effacer les filtres
        <DeleteOutlined fontSize="small" />
      </Button>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Effacer les filtres</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir effacer les filtres ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenDialog(false)}>
            Non
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setActiveFilters([]);
              setOpenDialog(false);
            }}
          >
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
