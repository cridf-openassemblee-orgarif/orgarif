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
import { useState } from 'react';
import { RepresentantId } from '../../../../domain/ids';
import { RepresentantDto } from '../../../../domain/organisme';
import { colors } from '../../../../styles/colors';
import { TextInput } from '../../../base-component/TextInput';
import { CreateRepresentantDialog } from '../../../representant/CreateRepresentantDialog';
import { SelectRepresentantInput } from './SelectRepresentantInput';
import { LocalDate } from '../../../../domain/time';
import { stringToLocalDate } from '../../../../utils';
import { asString } from '../../../../utils/nominal-class';
import { LoadingState } from '../../../../interfaces';
import { LoadingButton } from '../../../base-component/LoadingButton';

export const AddRepresentationComponent = (props: {
  representantLabel: string;
  setRepresentantId: (representantId: RepresentantId) => void;
  setStartDate: (startDate: LocalDate | undefined) => void;
  representantMandatoryError: boolean;
}) => {
  const [representant, setRepresentant] = useState<RepresentantDto>();
  const [startDate, setStartDate] = useState<LocalDate>();
  const [displayCreateRepresentantDialog, setDisplayCreateRepresentantDialog] =
    useState(false);
  const [createRepresentantNom, setCreateRepresentantNom] = useState('');
  const updateRepresentant = (r: RepresentantDto) => {
    setRepresentant(r);
    props.setRepresentantId(r.id);
  };
  const updateStartDate = (d: LocalDate | undefined) => {
    setStartDate(d);
    props.setStartDate(d);
  };
  return (
    <>
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <SelectRepresentantInput
          label={props.representantLabel}
          selection={representant}
          onChange={r => updateRepresentant(r)}
          onCreate={nom => {
            setDisplayCreateRepresentantDialog(true);
            setCreateRepresentantNom(nom);
          }}
        />
        {props.representantMandatoryError && (
          <div
            css={css`
              color: ${colors.errorRed};
              font-weight: bold;
              padding-bottom: 20px;
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
          initialValue={startDate ? asString(startDate) : ''}
          onChange={e =>
            updateStartDate(stringToLocalDate(e.currentTarget.value))
          }
        />
      </div>
      <CreateRepresentantDialog
        nomComplet={createRepresentantNom}
        display={displayCreateRepresentantDialog}
        close={() => setDisplayCreateRepresentantDialog(false)}
        onNewRepresentant={representant => {
          setDisplayCreateRepresentantDialog(false);
          setCreateRepresentantNom('');
          setRepresentant(representant);
        }}
      />
    </>
  );
};

export const AddRepresentationDialog = (props: {
  display: boolean;
  onClose: () => void;
  onAddRepresentation: (
    representantId: RepresentantId,
    startDate: LocalDate | undefined,
    suppleantId: RepresentantId | undefined,
    suppleantStartDate: LocalDate | undefined
  ) => Promise<void>;
}) => {
  const [representantId, setRepresentantId] = useState<RepresentantId>();
  const [representantStartDate, setRepresentantStartDate] =
    useState<LocalDate>();
  const [suppleantId, setSuppleantId] = useState<RepresentantId>();
  const [suppleantStartDate, setSuppleantStartDate] = useState<LocalDate>();
  const [representantMandatoryError, setRepresentantMandatoryError] =
    useState(false);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const onSubmit = () => {
    if (!representantId) {
      setRepresentantMandatoryError(true);
      return;
    }
    setRepresentantMandatoryError(false);
    setLoading('loading');
    props
      .onAddRepresentation(
        representantId,
        representantStartDate,
        suppleantId,
        suppleantStartDate
      )
      .then(() => setLoading('idle'));
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
        <DialogTitle>Ajout représentation</DialogTitle>
        <DialogContent>
          <h3>Représentant</h3>
          <AddRepresentationComponent
            representantLabel="Représentant"
            setRepresentantId={setRepresentantId}
            setStartDate={setRepresentantStartDate}
            representantMandatoryError={representantMandatoryError}
          />
          <h3
            css={css`
              margin-top: 20px;
            `}
          >
            Suppléant
          </h3>
          <AddRepresentationComponent
            representantLabel="Suppléant"
            setRepresentantId={setSuppleantId}
            setStartDate={setSuppleantStartDate}
            representantMandatoryError={false}
          />
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
            <LoadingButton loadingState={loading} onClick={onSubmit}>
              Ajouter
            </LoadingButton>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
