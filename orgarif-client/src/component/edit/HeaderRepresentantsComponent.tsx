/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Add } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { colors } from '../../styles/vars';
import { NumberInput } from '../base-component/NumberInput';
import { TextInput } from '../base-component/TextInput';
import { AddRepresentantComponent } from './AddRepresentantComponent';
import { editCommonClasses } from './EditPartialOrganismeOrInstance';

const classes = {
  numberBlock: css`
    width: 60px;
    margin-right: 10px;
  `,
  label: css`
    position: relative;
    top: 12px;
  `
};

export const HeaderRepresentantsComponent = (props: {
  nombreRepresentants?: number;
  nombreSuppleants?: number;
  onNombreRepresentantsChange: (nombre: number | undefined) => void;
  onNombreSuppleantsChange: (nombre: number | undefined) => void;
}) => {
  const [displayPopup, setDisplayPopup] = useState(false);
  return (
    <React.Fragment>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          background: ${colors.clearGrey2};
          ${editCommonClasses.border};
          padding: 8px;
          height: 56px;
        `}
      >
        <div
          css={css`
            flex: 1;
            text-align: left;
            padding: 4px 0 0 10px;
          `}
        >
          <Button
            variant="outlined"
            size="small"
            css={css`
              background: white;
            `}
            startIcon={<Add />}
            onClick={() => setDisplayPopup(true)}
          >
            Ajouter représentation
          </Button>
        </div>
        <div css={classes.numberBlock}>
          <NumberInput
            initialValue={props.nombreRepresentants}
            onChange={props.onNombreRepresentantsChange}
          />
        </div>
        <div css={classes.label}>représentants</div>
        <div
          css={css`
            width: 0;
            border-left: 1px dashed ${colors.grey2};
            margin: 8px 12px 8px 40px;
          `}
        />
        <div css={classes.numberBlock}>
          <NumberInput
            initialValue={props.nombreSuppleants}
            onChange={props.onNombreSuppleantsChange}
          />
        </div>
        <div css={classes.label}>suppléants</div>
      </div>
      <Dialog
        open={displayPopup}
        onClose={() => setDisplayPopup(false)}
        fullWidth={true}
      >
        <DialogTitle>Ajout représentation</DialogTitle>
        <DialogContent>
          <div
            css={css`
              margin: 10px;
            `}
          >
            <h3>Représentant</h3>
            <AddRepresentantComponent onAddRepresentation={() => {}} />
            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <TextInput
                name={'date'}
                type={'date'}
                label={'Date de début'}
                shrinkLabel={true}
              />
            </div>
            <h3>Suppléant</h3>
            <AddRepresentantComponent onAddRepresentation={() => {}} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDisplayPopup(false)} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
