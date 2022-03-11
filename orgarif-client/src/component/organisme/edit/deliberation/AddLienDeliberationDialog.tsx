/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DeliberationId } from '../../../../domain/ids';
import { DeliberationDto } from '../../../../domain/organisme';
import { colors } from '../../../../styles/colors';
import { TextInput } from '../../../base-component/TextInput';
import { SelectDeliberationInput } from './SelectDeliberationInput';
import { LoadingButton } from '../../../base-component/LoadingButton';
import { CreateDeliberationDialog } from './CreateDeliberationDialog';

export const AddLienDeliberationDialog = (props: {
  display: boolean;
  onClose: () => void;
  excludeDeliberations: DeliberationId[];
  onNewLienDeliberation: (
    deliberationId: DeliberationId,
    comment: string | undefined
  ) => Promise<void>;
}) => {
  const [selectedDeliberation, setSelectedDeliberation] =
    useState<DeliberationDto>();
  const [comment, setComment] = useState('');
  useEffect(() => {
    setComment('');
  }, [props.display]);
  const [displayCreateDeliberationDialog, setDisplayCreateDeliberationDialog] =
    useState(false);
  const [createDeliberationLibelle, setCreateDeliberationLibelle] =
    useState('');
  const [delibMandatory, setDelibMandatory] = useState(false);
  const onSubmit = () => {
    if (!selectedDeliberation) {
      setDelibMandatory(true);
      return Promise.resolve();
    }
    setDelibMandatory(false);
    return props.onNewLienDeliberation(
      selectedDeliberation.id,
      comment !== '' ? comment : undefined
    );
  };
  return (
    <React.Fragment>
      <Dialog
        // FIXME choose - pas clair le changement de popup si on superpose pas ?
        // open={props.display && !displayCreateDeliberationDialog}
        // bcp plus simple de faire superposition dans le cas du AddSuppleant dans l'édition de représentantion...
        open={props.display}
        onClose={props.onClose}
        fullWidth={true}
      >
        <DialogTitle>Ajout délibération</DialogTitle>
        <DialogContent>
          <div
            css={css`
              margin: 10px 0;
            `}
          >
            <SelectDeliberationInput
              selection={selectedDeliberation}
              excludeDeliberations={props.excludeDeliberations}
              onChange={setSelectedDeliberation}
              onCreate={libelle => {
                setCreateDeliberationLibelle(libelle);
                setDisplayCreateDeliberationDialog(true);
              }}
            />
            {delibMandatory && (
              <div
                css={css`
                  color: ${colors.errorRed};
                  font-weight: bold;
                `}
              >
                Sélection obligatoire
              </div>
            )}
          </div>
          <div
            css={css`
              margin: 10px 0;
            `}
          >
            <TextInput
              name="comment"
              label="Commentaire"
              multiline={true}
              multilineDefaultRows={3}
              onChange={e => setComment(e.currentTarget.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Annuler
          </Button>
          <LoadingButton onClick={onSubmit}>Ajouter</LoadingButton>
        </DialogActions>
      </Dialog>
      <CreateDeliberationDialog
        libelle={createDeliberationLibelle}
        display={displayCreateDeliberationDialog}
        close={() => setDisplayCreateDeliberationDialog(false)}
        onNewDeliberation={deliberation => {
          setDisplayCreateDeliberationDialog(false);
          setCreateDeliberationLibelle('');
          setSelectedDeliberation(deliberation);
        }}
      />
    </React.Fragment>
  );
};
