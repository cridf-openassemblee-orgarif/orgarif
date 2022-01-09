/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, DialogTitle } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { appContext } from '../../ApplicationContext';
import { DeliberationDto } from '../../domain/organisme';
import { LocalDate } from '../../domain/time';
import { colors } from '../../styles/colors';
import { TextInput } from '../base-component/TextInput';
import { stringToLocalDate } from '../../utils';

export const CreateDeliberationDialog = (props: {
  libelle: string;
  display: boolean;
  close: () => void;
  onNewDeliberation: (deliberation: DeliberationDto) => void;
}) => {
  const [dialogLoading, setDialogLoading] = useState(false);
  const [dateMandatory, setDateMandatory] = useState(false);
  // libelle & deliberationDate because TextInput type=date doesn't seem to work with SimpleForm
  const [libelle, setLibelle] = useState(props.libelle);
  useEffect(() => setLibelle(props.libelle), [props.libelle]);
  const [deliberationDate, setDeliberationDate] = useState<LocalDate>();
  const onSubmit = () => {
    if (!deliberationDate) {
      setDateMandatory(true);
      return;
    }
    setDialogLoading(true);
    setDateMandatory(false);
    appContext
      .commandService()
      .createDeliberationCommand({
        libelle,
        deliberationDate
      })
      .then(r => {
        setDialogLoading(false);
        const deliberation: DeliberationDto = {
          id: r.deliberationId,
          libelle,
          deliberationDate
        };
        props.onNewDeliberation(deliberation);
        props.close();
      });
  };
  return (
    <Dialog open={props.display} onClose={props.close} fullWidth={true}>
      <DialogTitle>Ajouter nouvelle délibération</DialogTitle>
      <DialogContent>
        <div
          css={css`
            margin: 10px 0;
          `}
        >
          <TextInput
            name="libelle"
            label="Libellé"
            initialValue={libelle}
            onChange={e => setLibelle(e.currentTarget.value)}
          />
          <div
            css={css`
              padding-top: 20px;
            `}
          >
            <TextInput
              name="deliberationDate"
              label="Date de délibération"
              type="date"
              onChange={e => {
                const date = stringToLocalDate(e.currentTarget.value);
                setDeliberationDate(date);
              }}
            />
            {dateMandatory && (
              <div
                css={css`
                  color: ${colors.errorRed};
                  font-weight: bold;
                `}
              >
                La date est obligatoire
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
            variant="contained"
            color="primary"
            disabled={dialogLoading}
            onClick={onSubmit}
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
    </Dialog>
  );
};
