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
import { RepresentantId } from '../../../../domain/ids';
import { RepresentantDto } from '../../../../domain/organisme';
import { colors } from '../../../../styles/vars';
import { TextInput } from '../../../base-component/TextInput';
import { CreateRepresentantDialog } from '../../../representant/CreateRepresentantDialog';
import { SelectRepresentantInput } from './SelectRepresentantInput';

export const AddRepresentationDialog = (props: {
  display: boolean;
  onClose: () => void;
  onAddRepresentation: (representantId: RepresentantId) => Promise<void>;
}) => {
  const [selectedRepresentant, setSelectedRepresentant] = useState<
    RepresentantDto | undefined
  >(undefined);
  const [selectedSuppleant, setSelectedSuppleant] = useState<
    RepresentantDto | undefined
  >(undefined);
  const [displayCreateRepresentantDialog, setDisplayCreateRepresentantDialog] =
    useState(false);
  const [createRepresentantNom, setCreateRepresentantNom] = useState('');
  // const [loading, setLoading] = useState(false);
  const [representantMandatory, setRepresentantMandatory] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = () => {
    if (!selectedRepresentant) {
      setRepresentantMandatory(true);
      return;
    }
    setRepresentantMandatory(false);
    setSubmitting(true);
    props
      .onAddRepresentation(selectedRepresentant.id)
      .then(() => setSubmitting(false));
  };
  return (
    <React.Fragment>
      <Dialog
        // FIXME choose - pas clair le changement de popup si on superpose pas ?
        // open={props.display && !displayCreateRepresentantDialog}
        open={props.display}
        onClose={props.onClose}
        fullWidth={true}
      >
        <DialogTitle>Ajout représentant</DialogTitle>
        <DialogContent>
          <h3>Représentant</h3>
          <div
            css={css`
              margin: 10px 0;
            `}
          >
            <SelectRepresentantInput
              label="Représentant"
              selection={selectedRepresentant}
              onChange={setSelectedRepresentant}
              onCreate={nom => {
                setCreateRepresentantNom(nom);
                setDisplayCreateRepresentantDialog(true);
              }}
            />
            {representantMandatory && (
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
              name={'dateDebutRepresentant'}
              label="Date de début"
              type="date"
            />
          </div>
          <div
            css={css`
              margin-top: 20px;
            `}
          >
            <h3>Suppléant</h3>
          </div>
          <div
            css={css`
              margin: 10px 0;
            `}
          >
            <SelectRepresentantInput
              label="Suppléant"
              selection={selectedSuppleant}
              onChange={setSelectedSuppleant}
              onCreate={nom => {
                setCreateRepresentantNom(nom);
                setDisplayCreateRepresentantDialog(true);
              }}
            />
          </div>
          <div
            css={css`
              margin: 10px 0;
            `}
          >
            <TextInput
              name={'dateDebutSuppléant'}
              label="Date de début"
              type="date"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
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
      <CreateRepresentantDialog
        nomComplet={createRepresentantNom}
        display={displayCreateRepresentantDialog}
        close={() => setDisplayCreateRepresentantDialog(false)}
        onNewRepresentant={representant => {
          setDisplayCreateRepresentantDialog(false);
          setCreateRepresentantNom('');
          setSelectedRepresentant(representant);
        }}
      />
    </React.Fragment>
  );
};
