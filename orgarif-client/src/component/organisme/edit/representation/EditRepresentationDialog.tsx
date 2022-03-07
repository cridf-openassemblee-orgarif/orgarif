/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { RepresentationDto } from '../../../../domain/organisme';
import { TabPanel, TabsContainer } from '../../../base-component/TabsContainer';
import { TextInput } from '../../../base-component/TextInput';
import { classes } from '../../../category/EditCategoriesComponent';
import { dialogClasses } from '../dialog-common';
import { WorkInProgressSign } from '../../../base-component/WorkInProgressSign';

const RepresentationPanel = (props: {
  representation: RepresentationDto;
  onClose: () => void;
}) => (
  <React.Fragment>
    <div css={dialogClasses.editBlock}>
      <h3>Représentant</h3>
      <TextInput name={'date'} type={'date'} label={'Date de début'} />
    </div>
    <div css={dialogClasses.editBlock}>
      <h3>Suppléant</h3>
      {props.representation.suppleance && (
        <TextInput name={'date'} type={'date'} label={'Date de début'} />
      )}
      {!props.representation.suppleance && (
        <Button variant="contained">Ajouter Suppléant</Button>
      )}
    </div>
    <div
      css={css`
        ${classes.editButton}
        padding-top: 40px;
      `}
    >
      <Button onClick={props.onClose} color="primary">
        Annuler
      </Button>
      <Button type="submit" variant="contained" color="primary" size="small">
        Enregistrer
      </Button>
    </div>
  </React.Fragment>
);

type VacanceDecision = 'siege-vacant' | 'suppleant-remplace' | 'siege-remplace';

const DemissionPanel = (props: {
  representation: RepresentationDto;
  onClose: () => void;
}) => {
  const [suppleantDecision, setSuppleantDecision] =
    useState<VacanceDecision>('siege-vacant');
  return (
    <React.Fragment>
      <div css={dialogClasses.editBlock}>
        <h3>Représentant</h3>
        <TextInput name={'date'} type={'date'} label={'Date de fin'} />
      </div>
      {props.representation.suppleance && (
        <div css={dialogClasses.editBlock}>
          <h3>Vacance</h3>
          <RadioGroup
            value={suppleantDecision}
            name="radio-buttons-group"
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              value: string
            ) => setSuppleantDecision(value as VacanceDecision)}
          >
            <FormControlLabel
              value="siege-vacant"
              control={<Radio />}
              label="Le siège reste vacant, le suppléant reste suppléant"
            />
            <FormControlLabel
              value="suppleant-remplace"
              control={<Radio />}
              label="Le suppléant remplace le représentant à date + 1"
            />
            <FormControlLabel
              value="siege-remplace"
              control={<Radio />}
              label="Le représentant suivant prend la place, le suppléant démissionne à date"
            />
          </RadioGroup>
        </div>
      )}
      <div css={classes.editButton}>
        <Button onClick={props.onClose} color="primary">
          Annuler
        </Button>
        <Button type="submit" variant="contained" color="primary" size="small">
          Enregistrer
        </Button>
      </div>
    </React.Fragment>
  );
};

const DemisssionSuppleantPanel = (props: { onClose: () => void }) => (
  <React.Fragment>
    <div css={dialogClasses.editBlock}>
      <h3>Suppléant</h3>
      <TextInput name={'date'} type={'date'} label={'Date de fin'} />
    </div>
    <div
      css={css`
        ${classes.editButton}
        padding-top: 40px;
      `}
    >
      <Button onClick={props.onClose} color="primary">
        Annuler
      </Button>
      <Button type="submit" variant="contained" color="primary" size="small">
        Enregistrer
      </Button>
    </div>
  </React.Fragment>
);

const SuppressionPanel = (props: {
  representation: RepresentationDto;
  onClose: () => void;
}) => (
  <React.Fragment>
    <div css={dialogClasses.editBlock}>
      La suppression est définitive et sert à corriger les erreurs de saisie
      uniquement.
    </div>
    {!props.representation.suppleance && (
      <div css={dialogClasses.editBlock}>
        <Button variant="contained" color="error">
          Supprimer la représentation
        </Button>
      </div>
    )}
    {props.representation.suppleance && (
      <React.Fragment>
        <div css={dialogClasses.editBlock}>
          <h3>Représentant</h3>
          Supprimer la représentation
          <React.Fragment>
            {' '}
            <b>et</b> la suppléance
          </React.Fragment>
          <div
            css={css`
              padding: 10px 0;
            `}
          >
            <Button variant="contained" color="error">
              Supprimer
            </Button>
          </div>
        </div>
        <div css={dialogClasses.editBlock}>
          <h3>Suppléant</h3>
          Supprimer la suppléance uniquement
          <div
            css={css`
              padding: 10px 0;
            `}
          >
            <Button variant="contained" color="error">
              Supprimer
            </Button>
          </div>
        </div>
      </React.Fragment>
    )}
    <div
      css={css`
        ${classes.editButton}
      `}
    >
      <Button onClick={props.onClose} color="primary">
        Annuler
      </Button>
    </div>
  </React.Fragment>
);

export const EditRepresentationDiaglog = (props: {
  representation: RepresentationDto;
  display: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog
      open={props.display}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={'lg'}
    >
      <DialogTitle>Modifier</DialogTitle>
      <DialogContent>
        <TabsContainer>
          <TabPanel label="Dates de début">
            <RepresentationPanel
              representation={props.representation}
              onClose={props.onClose}
            />
          </TabPanel>
          <TabPanel label="Démission représentant">
            <WorkInProgressSign />
            <DemissionPanel
              representation={props.representation}
              onClose={props.onClose}
            />
          </TabPanel>
          {props.representation.suppleance && (
            <TabPanel label="Démission suppléant">
              <WorkInProgressSign />
              <DemisssionSuppleantPanel onClose={props.onClose} />
            </TabPanel>
          )}
          <TabPanel label="Suppression">
            <WorkInProgressSign />
            <SuppressionPanel
              representation={props.representation}
              onClose={props.onClose}
            />
          </TabPanel>
        </TabsContainer>
      </DialogContent>
    </Dialog>
  );
};
