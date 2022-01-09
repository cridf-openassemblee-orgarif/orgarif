/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { DeliberationId } from '../../../../domain/ids';
import { DeliberationDto } from '../../../../domain/organisme';
import { colors } from '../../../../styles/colors';
import { TextInput } from '../../../base-component/TextInput';
import { CreateDeliberationDialog } from '../../../deliberation/CreateDeliberationDialog';
import { SelectDeliberationInput } from './SelectDeliberationInput';
import { LoadingState } from '../../../../interfaces';

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
  const [inputValue, setInputValue] = useState('');
  const [displayCreateDeliberationDialog, setDisplayCreateDeliberationDialog] =
    useState(false);
  const [createDeliberationLibelle, setCreateDeliberationLibelle] =
    useState('');
  const [comment, setComment] = useState('');
  // const [dialogLibelle, setDialogLibelle] = useState('');
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [deliberations, setDeliberations] = useState<
    (DeliberationDto | string)[]
  >([]);
  // on est obligé car il y a le scénario ou user a saisi label exact d'une delib deja liée
  // auquel cas deliberations sera un array vide... mais c'est aussi le cas au départ
  const [alreadySet, setAlreadySet] = useState(false);
  const [delibMandatory, setDelibMandatory] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // search suggestions
  // TODO plutot prévenir si delib déjà liée
  // const onInputChange = (event: React.ChangeEvent<{}>, value: string) => {
  const openDialog = (libelle: string) => {
    // setValue(null);
    // // setInputValue('');
    // setDeliberations([]);
    // // setDialogLibelle(libelle);
    // // without it popup is directly submitted when user use 'enter'
    // defer(() => setDisplayCreateDialog(true));
  };
  const onSubmit = () => {
    if (!selectedDeliberation) {
      setDelibMandatory(true);
      return;
    }
    setDelibMandatory(false);
    setSubmitting(true);
    props
      .onNewLienDeliberation(
        selectedDeliberation.id,
        comment !== '' ? comment : undefined
      )
      .then(() => setSubmitting(false));
  };
  return (
    <React.Fragment>
      <Dialog
        // FIXME choose - pas clair le changement de popup si on superpose pas ?
        // open={props.display && !displayCreateDeliberationDialog}
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
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={submitting}
              onClick={onSubmit}
            >
              Ajouter
            </Button>
            {submitting && (
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
