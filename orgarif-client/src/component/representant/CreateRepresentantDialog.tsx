/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, DialogTitle } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { appContext } from '../../ApplicationContext';
import { RepresentantDto } from '../../domain/organisme';
import { TextInput } from '../base-component/TextInput';

const extractPrenomNom = (nomComplet: string) => {
  const parts = nomComplet.split(' ');
  if (parts.length > 1) {
    const prenom = parts[0];
    parts.shift();
    const nom = parts.join(' ');
    return { prenom, nom };
  } else {
    return { prenom: parts[0], nom: '' };
  }
};

export const CreateRepresentantDialog = (props: {
  nomComplet: string;
  display: boolean;
  close: () => void;
  onNewRepresentant: (representantDto: RepresentantDto) => void;
}) => {
  const [dialogLoading, setDialogLoading] = useState(false);
  const extract = extractPrenomNom(props.nomComplet);
  const [prenom, setPrenom] = useState(extract.prenom);
  const [nom, setNom] = useState(extract.nom);
  useEffect(() => {
    const { prenom, nom } = extractPrenomNom(props.nomComplet);
    setPrenom(prenom);
    setNom(nom);
  }, [props.nomComplet]);
  const onSubmit = () => {
    setDialogLoading(true);
    appContext
      .commandService()
      .createRepresentantCommand({ prenom, nom })
      .then(r => {
        setDialogLoading(false);
        const representant: RepresentantDto = {
          id: r.representantId,
          isElu: false,
          civilite: undefined,
          prenom,
          nom
        };
        props.onNewRepresentant(representant);
        props.close();
      });
  };
  return (
    <Dialog open={props.display} onClose={props.close} fullWidth={true}>
      <DialogTitle>Ajouter nouveau représentant</DialogTitle>
      <DialogContent>
        <div
          css={css`
            margin: 10px 0;
          `}
        >
          <TextInput
            name="nom"
            label="Prénom"
            initialValue={prenom}
            onChange={e => setPrenom(e.currentTarget.value)}
          />
        </div>
        <div
          css={css`
            margin: 10px 0;
          `}
        >
          <TextInput
            name="nom"
            label="Nom"
            initialValue={nom}
            onChange={e => setNom(e.currentTarget.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="primary">
          Annuler
        </Button>
        <div
          css={css`
            padding-left: 10px;
          `}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={dialogLoading}
            onClick={onSubmit}
          >
            Ajouter
          </Button>
          {dialogLoading && (
            <div
              css={css`
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -12px;
                margin-left: -12px;
              `}
            >
              <CircularProgress size={24} />
            </div>
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
};
