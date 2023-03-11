/** @jsxImportSource @emotion/react */
import { DeliberationId } from '../../../../../generated/domain/ids';
import { DeliberationDto } from '../../../../../generated/domain/organisme';
import { LoadingButton } from '../../../../common/LoadingButton';
import { TextInput } from '../../../../common/form/TextInput';
import { colors } from '../../../../styles/colors';
import { CreateDeliberationDialog } from './CreateDeliberationDialog';
import { SelectDeliberationInput } from './SelectDeliberationInput';
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
  const close = () => {
      setSelectedDeliberation(undefined);
      props.onClose()
  }
  return (
    <React.Fragment>
      <Dialog
        // FIXME choose - pas clair le changement de popup si on superpose pas ?
        // open={props.display && !displayCreateDeliberationDialog}
        // bcp plus simple de faire superposition dans le cas du AddSuppleant dans l'édition de représentantion...
        open={props.display}
        onClose={close}
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
          <LoadingButton onClick={onSubmit}>Ajouter</LoadingButton>
          <Button onClick={close} color="primary">
            Annuler
          </Button>
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
