/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { TextInput } from '../../../base-component/TextInput';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { colors } from '../../../../styles/colors';

export const AddInstanceComponent = (props: {
  addInstance: (nom: string) => void;
}) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [nomInstance, setNomInstance] = useState('');
  const [displayError, setDisplayError] = useState(false);
  return (
    <>
      <div
        css={css`
          margin: 20px 0;
        `}
      >
        <Button
          startIcon={<Add />}
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => setDisplayDialog(true)}
        >
          Ajouter une instance
        </Button>
      </div>
      <Dialog
        open={displayDialog}
        onClose={() => setDisplayDialog(false)}
        fullWidth={true}
      >
        <DialogTitle>Ajouter une instance</DialogTitle>
        <DialogContent>
          <div
            css={css`
              padding: 20px 0;
            `}
          >
            <TextInput
              name="nom"
              label="Nouvelle instance"
              onChange={e => setNomInstance(e.currentTarget.value)}
            />
            {displayError && (
              <div
                css={css`
                  color: ${colors.errorRed};
                  font-weight: bold;
                `}
              >
                Nom obligatoire pour créer une instance
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDisplayDialog(false)} color="primary">
            Annuler
          </Button>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                if (nomInstance === '') {
                  setDisplayError(true);
                  return;
                }
                props.addInstance(nomInstance);
                setDisplayDialog(false);
                setDisplayError(false);
              }}
            >
              Créer instance
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};
