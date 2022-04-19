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
import { SelectRepresentantInput } from './SelectRepresentantInput';
import { LocalDate } from '../../../../domain/time';
import { capitalizeFirstLetter, stringToLocalDate } from '../../../../utils';
import { asString } from '../../../../utils/nominal-class';
import { LoadingButton } from '../../../base-component/LoadingButton';
import { CreateRepresentantDialog } from '../representant/CreateRepresentantDialog';

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
  return (
    <React.Fragment>
      <Dialog open={props.display} onClose={props.onClose} fullWidth={true}>
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
              initialValue={startDate ? asString(startDate) : ''}
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
          <Button onClick={props.onClose} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
