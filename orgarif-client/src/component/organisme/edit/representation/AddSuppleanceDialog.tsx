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
import { LocalDate } from '../../../../domain/time';
import { LoadingState } from '../../../../interfaces';
import { LoadingButton } from '../../../base-component/LoadingButton';
import { AddRepresentationComponent } from './AddRepresentationDialog';

export const AddSuppleanceDialog = (props: {
  display: boolean;
  onClose: () => void;
  onAddInstance: (
    suppleantId: RepresentantId,
    suppleantStartDate: LocalDate | undefined
  ) => Promise<void>;
}) => {
  const [suppleantId, setSuppleantId] = useState<RepresentantId>();
  const [suppleantStartDate, setSuppleantStartDate] = useState<LocalDate>();
  const [suppleantMandatoryError, setSuppleantMandatoryError] = useState(false);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const onSubmit = () => {
    if (!suppleantId) {
      setSuppleantMandatoryError(true);
      return;
    }
    setSuppleantMandatoryError(false);
    setLoading('loading');
    props.onAddInstance(suppleantId, suppleantStartDate).then(() => {
      setLoading('idle');
      props.onClose();
    });
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
        <DialogTitle>Ajout suppléance</DialogTitle>
        <DialogContent>
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
            representantMandatoryError={suppleantMandatoryError}
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
