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
import { useEffect, useState } from 'react';
import { colors } from '../../../styles/colors';
import { appContext } from '../../../ApplicationContext';
import { TextInput } from '../../base-component/TextInput';

export const AddOrganismeComponent = () => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [nom, setNom] = useState('');
  const [displayError, setDisplayError] = useState(false);
  useEffect(() => {
    setNom('');
  }, [displayDialog]);
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
          Organisme
        </Button>
      </div>
      <Dialog
        open={displayDialog}
        onClose={() => setDisplayDialog(false)}
        fullWidth={true}
      >
        <DialogTitle>Ajouter un organisme</DialogTitle>
        <DialogContent>
          <div
            css={css`
              padding: 20px 0;
            `}
          >
            <TextInput
              name="nom"
              label="Nouvel organisme"
              onChange={e => setNom(e.currentTarget.value)}
            />
            {displayError && (
              <div
                css={css`
                  color: ${colors.errorRed};
                  font-weight: bold;
                `}
              >
                Nom obligatoire pour créer un organisme
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDisplayDialog(false)} color="primary">
            Annuler
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              if (nom === '') {
                setDisplayError(true);
                return;
              }
              appContext
                .commandService()
                .createOrganismeCommand({ nom })
                .then(r => {
                  appContext.applicationHistory().goTo({
                    name: 'EditOrganismeRoute',
                    id: r.id
                  });
                });
            }}
          >
            Créer organisme
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
