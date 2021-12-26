/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, DialogTitle } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { useState } from 'react';
import { DeliberationId } from '../../domain/ids';
import { LocalDate } from '../../domain/time';
import { colors } from '../../styles/vars';
import { LocalDateInput } from '../base-component/LocalDateInput';
import { TextInput } from '../base-component/TextInput';

interface DialogFormDto {
  libelle: string;
  deliberationDate: string;
}

export const CreateDeliberationAndAddLienComponent = (props: {
  libelle: string;
  display: boolean;
  close: () => void;
  onNewLienDeliberation: (deliberationId: DeliberationId) => void;
  onNewDeliberationAndLien: (
    libelle: string,
    deliberationDate: LocalDate
  ) => void;
}) => {
  const [dialogLoading, setDialogLoading] = useState(false);
  const [displayError] = useState('');
  const dialogSubmit = (dto: DialogFormDto) => {
    // const deliberationDate = stringToLocalDate(dto.deliberationDate);
    setDialogLoading(true);
    // appContext
    //   .commandService()
    //   .createDeliberationAndAddLienCommand({
    //     libelle: dto.libelle,
    //     deliberationDate,
    //     organismeId: props.organismeId,
    //     instanceId: props.instanceId
    //   })
    //   .then(r => {
    //     const deliberation: DeliberationInfos = {
    //       id: r.deliberationId,
    //       libelle: dto.libelle,
    //       deliberationDate
    //     };
    //     props.addDeliberation({
    //       id: r.lienDeliberationId,
    //       deliberation
    //     });
    //     props.close();
    //     setDisplayError('');
    //     setDialogLoading(false);
    //   })
    //   .catch((e: RequestError) => {
    //     setDialogLoading(false);
    //     if (e.error === 'SerializationError') {
    //       setDisplayError(e.message);
    //     } else {
    //       throw e;
    //     }
    //   });
  };
  return (
    <Dialog open={props.display} onClose={props.close}>
      {/*<SimpleForm onSubmit={dialogSubmit}>*/}
      <DialogTitle>Ajouter nouvelle délibération</DialogTitle>
      <DialogContent>
        <div
          css={css`
            margin: 10px;
          `}
        >
          <TextInput
            name="libelle"
            label="Libellé"
            initialValue={props.libelle}
          />
          <div
            css={css`
              padding-top: 10px;
            `}
          >
            <LocalDateInput
              label="Date de délibération"
              name="deliberationDate"
              autoFocus
            />
            {displayError !== '' && (
              <div
                css={css`
                  color: ${colors.errorRed};
                  font-weight: bold;
                `}
              >
                {displayError}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="primary">
          Annuler
        </Button>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={dialogLoading}
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
      {/*</SimpleForm>*/}
    </Dialog>
  );
};
