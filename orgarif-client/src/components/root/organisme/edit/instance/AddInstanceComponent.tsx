/** @jsxImportSource @emotion/react */
import { TextInput } from '../../../../common/form/TextInput';
import { colors } from '../../../../styles/colors';
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
import { useEffect, useState } from 'react';

export const AddInstanceComponent = (props: {
  addInstance: (nom: string) => void;
}) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [nomInstance, setNomInstance] = useState('');
  const [displayError, setDisplayError] = useState(false);
  useEffect(() => {
    setNomInstance('');
  }, [displayDialog]);
  return (
    <>
      <div
        css={css`
          padding-bottom: 20px;
        `}
      >
        <Button
          startIcon={<Add />}
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => setDisplayDialog(true)}
          css={css`
            background: ${colors.white};
          `}
        >
          Instance
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
          <Button onClick={() => setDisplayDialog(false)} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
