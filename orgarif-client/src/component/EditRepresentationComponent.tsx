/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Delete, DragHandle, Edit } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { RepresentationDto } from '../domain/organisme';
import { colors } from '../styles/vars';
import { clientUid } from '../utils';
import { asString } from '../utils/nominal-class';
import { TextInput } from './base-component/TextInput';
import { AddRepresentantComponent } from './edit/AddRepresentantComponent';
import { classes } from './edit/EditCategoriesComponent';

const actionsClass = asString(clientUid());

export const EditRepresentationComponent = (props: {
  representation: RepresentationDto;
}) => {
  const [displayEditPopup, setDisplayEditPopup] = useState(false);
  const [displayDemissionPopup, setDisplayDemissionPopup] = useState(false);
  return (
    <React.Fragment>
      <div
        css={css`
          margin: 12px 4px;
          display: flex;
          align-items: center;
          .${actionsClass} {
            visibility: hidden;
          }
          &:hover {
            .${actionsClass} {
              visibility: visible;
            }
          }
        `}
      >
        <div
          className={actionsClass}
          css={css`
            width: 40px;
            height: 40px;
            padding-top: 8px;
            margin-right: 20px;
            background: ${colors.clearGrey};
            border-radius: 50%;
            text-align: center;
          `}
        >
          <DragHandle />
        </div>
        <div>
          <div>
            {props.representation.representant.prenom}{' '}
            {props.representation.representant.nom}
          </div>
          {props.representation.suppleance && (
            <div
              css={css`
                padding: 8px 0 0 12px;
                font-size: 0.9rem;
              `}
            >
              <span
                css={css`
                  font-style: italic;
                  color: ${colors.grey};
                `}
              >
                Suppléant :
              </span>{' '}
              {props.representation.suppleance.representant.prenom}{' '}
              {props.representation.suppleance.representant.nom}
            </div>
          )}
        </div>
        <div
          css={css`
            flex: 1;
          `}
        />
        <div
          css={css`
            margin-left: 20px;
            display: flex;
          `}
          className={actionsClass}
        >
          <div
            css={css`
              margin-left: 10px;
            `}
          >
            <Button
              variant="outlined"
              size="small"
              css={css`
                background: white;
              `}
              startIcon={<Edit />}
              onClick={() => setDisplayEditPopup(true)}
            >
              Éditer
            </Button>
          </div>
          <div
            css={css`
              margin-left: 10px;
            `}
          >
            <Button
              variant="outlined"
              size="small"
              css={css`
                background: white;
              `}
              startIcon={<Delete />}
              onClick={() => setDisplayDemissionPopup(true)}
            >
              Démission
            </Button>
          </div>
        </div>
      </div>
      <Dialog
        open={displayEditPopup}
        onClose={() => setDisplayEditPopup(false)}
        fullWidth={true}
      >
        <DialogTitle>Édition représentant</DialogTitle>
        <DialogContent>
          <div css={classes.editBlock}>
            <h3>Éditer date début</h3>
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
          </div>
          <div css={classes.editBlock}>
            <h3>Ajouter suppléant</h3>
            <AddRepresentantComponent onAddRepresentation={() => {}} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDisplayEditPopup(false)} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={displayDemissionPopup}
        onClose={() => setDisplayDemissionPopup(false)}
        fullWidth={true}
      >
        <DialogTitle>Démissions et suppressions</DialogTitle>
        <DialogContent>
          <div css={classes.editBlock}>
            <h3>Démission</h3>
            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <TextInput
                name={'date'}
                type={'date'}
                label={'Date de démission'}
                shrinkLabel={true}
              />
            </div>
            Le suppléant remplace à la date
            <Checkbox />
          </div>
          <div css={classes.editBlock}>
            <h3>Démission du suppléant</h3>
          </div>
          <div css={classes.editBlock}>
            <h3>Suppression</h3>
          </div>
          <div css={classes.editBlock}>
            <h3>Suppression du suppléant</h3>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDisplayDemissionPopup(false)}
            color="primary"
          >
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
