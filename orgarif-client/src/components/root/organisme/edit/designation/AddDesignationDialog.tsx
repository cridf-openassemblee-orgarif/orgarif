/** @jsxImportSource @emotion/react */
import { LocalDate } from '../../../../../domain/datetime';
import { RepresentantId } from '../../../../../generated/domain/ids';
import { RepresentantDto } from '../../../../../generated/domain/organisme';
import { capitalizeFirstLetter, stringToLocalDate } from '../../../../../utils';
import { LoadingButton } from '../../../../common/LoadingButton';
import { TextInput } from '../../../../common/form/TextInput';
import { colors } from '../../../../styles/colors';
import { CreateRepresentantDialog } from '../representant/CreateRepresentantDialog';
import { SelectRepresentantInput } from './SelectRepresentantInput';
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

export const AddDesignationDialog = (props: {
  display: boolean;
  onClose: () => void;
  onAddDesignation: (
    representantId: RepresentantId,
    startDate: LocalDate | undefined
  ) => Promise<void>;
  representantLabel: string;
}) => {
  const [representant, setRepresentant] = useState<RepresentantDto>();
  const [startDate, setStartDate] = useState<LocalDate>();
  const [displayCreateRepresentantDialog, setDisplayCreateRepresentantDialog] =
    useState(false);
  const [createRepresentantNom, setCreateRepresentantNom] = useState('');
  const [mandatoryError, setMandatoryError] = useState(false);
  const onSubmit = () => {
    if (!representant) {
      setMandatoryError(true);
      return Promise.resolve();
    }
    setMandatoryError(false);
    return props.onAddDesignation(representant.id, startDate).then(() => {
      setRepresentant(undefined);
      setStartDate(undefined);
    });
  };
  const close = () => {
    setRepresentant(undefined);
    setStartDate(undefined);
    props.onClose();
  };
  return (
    <React.Fragment>
      <Dialog open={props.display} onClose={close} fullWidth={true}>
        <DialogTitle>Ajout désignation {props.representantLabel}</DialogTitle>
        <DialogContent>
          <div
            css={css`
              margin: 10px 0;
            `}
          >
            <SelectRepresentantInput
              label={capitalizeFirstLetter(props.representantLabel)}
              selection={representant}
              onChange={r => setRepresentant(r)}
              onCreate={nom => {
                setDisplayCreateRepresentantDialog(true);
                setCreateRepresentantNom(nom);
              }}
            />
            {mandatoryError && (
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
              initialValue={startDate ?? ''}
              onChange={e =>
                setStartDate(stringToLocalDate(e.currentTarget.value))
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
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={onSubmit}>Ajouter</LoadingButton>
          <Button onClick={close} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
