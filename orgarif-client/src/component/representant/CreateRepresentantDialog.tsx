/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { appContext } from '../../ApplicationContext';
import { RepresentantDto } from '../../domain/organisme';
import { TextInput } from '../base-component/TextInput';
import { LoadingButton } from '../base-component/LoadingButton';

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
  const extract = extractPrenomNom(props.nomComplet);
  const [prenom, setPrenom] = useState(extract.prenom);
  const [nom, setNom] = useState(extract.nom);
  useEffect(() => {
    const { prenom, nom } = extractPrenomNom(props.nomComplet);
    setPrenom(prenom);
    setNom(nom);
  }, [props.nomComplet]);
  const onSubmit = () =>
    appContext
      .commandService()
      .createRepresentantCommand({ prenom, nom })
      .then(r => {
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
        <LoadingButton onClick={onSubmit}>Ajouter</LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
