/** @jsxImportSource @emotion/react */
import { CreateOrganismeCommandResponse } from '../../../../generated/command/commands';
import { appContext } from '../../../../services/ApplicationContext';
import { TextInput } from '../../../common/form/TextInput';
import { useGoTo } from '../../../routing/routing-utils';
import { colors } from '../../../styles/colors';
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

export const AddOrganismeComponent = () => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [nom, setNom] = useState('');
  const [displayError, setDisplayError] = useState(false);
  const goTo = useGoTo();
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
                .send<CreateOrganismeCommandResponse>({
                  objectType: 'CreateOrganismeCommand',
                  nom
                })
                .then(r => {
                  goTo({
                    name: 'EditOrganismeRoute',
                    id: r.id
                  });
                });
            }}
          >
            Créer organisme
          </Button>
          <Button onClick={() => setDisplayDialog(false)} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
