/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Add } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { colors } from '../../styles/vars';
import { editCommonClasses } from './EditPartialOrganismeOrInstance';

export const AddDeliberationComponent = () => {
  const [displayPopup, setDisplayPopup] = useState(false);
  return (
    <React.Fragment>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          background: ${colors.clearGrey2};
          ${editCommonClasses.border};
          padding: 8px;
          height: 56px;
        `}
      >
        <div
          css={css`
            flex: 1;
            text-align: left;
            padding: 4px 0 0 10px;
          `}
        >
          <Button
            variant="outlined"
            size="small"
            css={css`
              background: white;
            `}
            startIcon={<Add />}
          >
            Ajouter délibération
          </Button>
        </div>
      </div>
      <Dialog
        open={displayPopup}
        onClose={() => setDisplayPopup(false)}
        fullWidth={true}
      >
        <DialogTitle>Ajout représentation</DialogTitle>
        <DialogContent>
          <div
            css={css`
              margin: 10px;
            `}
          >
            delib
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDisplayPopup(false)} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
