/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { DesignationDto } from '../../../../domain/organisme';
import { TabPanel, TabsContainer } from '../../../base-component/TabsContainer';
import { TextInput } from '../../../base-component/TextInput';
import { classes } from '../../../category/EditCategoriesComponent';
import { dialogClasses } from '../dialog-common';
import { LocalDate } from '../../../../domain/time';
import {
  asString,
  instanciateNominalString
} from '../../../../utils/nominal-class';
import { LoadingButton } from '../../../base-component/LoadingButton';
import { appContext } from '../../../../ApplicationContext';
import { ConfirmButton } from '../../../base-component/ConfirmButton';

const DesignationPanel = (props: {
  designation: DesignationDto;
  // TODO write sur les deux formats d'update : "propre" ou qui recharge tout
  onUpdate: () => Promise<void>;
  onClose: () => void;
}) => {
  const [startDate, setStartDate] = useState<LocalDate | undefined>(
    props.designation.startDate
  );
  const [endDate, setEndDate] = useState<LocalDate | undefined>(
    props.designation.startDate
  );
  const submit = () => {
    return appContext
      .commandService()
      .updateDesignationDatesCommand({
        designationId: props.designation.id,
        startDate,
        endDate
      })
      .then(props.onUpdate)
      .then(() => {
        props.onClose();
      });
  };
  return (
    <>
      <div css={dialogClasses.editBlock}>
        <TextInput
          name={'startDate'}
          type={'date'}
          label={'Date de début'}
          initialValue={
            props.designation.startDate
              ? asString(props.designation.startDate)
              : ''
          }
          onChange={e =>
            setStartDate(
              e.currentTarget.value
                ? instanciateNominalString<LocalDate>(e.currentTarget.value)
                : undefined
            )
          }
        />
      </div>
      <div css={dialogClasses.editBlock}>
        <TextInput
          name={'endDate'}
          type={'date'}
          label={'Date de fin'}
          initialValue={
            props.designation.endDate ? asString(props.designation.endDate) : ''
          }
          onChange={e =>
            setEndDate(
              e.currentTarget.value
                ? instanciateNominalString<LocalDate>(e.currentTarget.value)
                : undefined
            )
          }
        />
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
        <LoadingButton onClick={submit}>Enregistrer</LoadingButton>
      </div>
    </>
  );
};

const SuppressionPanel = (props: {
  designation: DesignationDto;
  onClose: () => void;
}) => {
  return (
    <React.Fragment>
      <div css={dialogClasses.editBlock}>
        La suppression est définitive et sert à corriger les erreurs de saisie
        uniquement.
      </div>
      <div
        css={css`
          ${classes.editButton}
        `}
      >
        <Button onClick={props.onClose} color="primary">
          Annuler
        </Button>
        <ConfirmButton
          dialogTitle="Supprimer la désignation"
          okButton="Supprimer"
          cancelButton="Annuler"
          color="error"
          onConfirm={() =>
            appContext
              .commandService()
              .updateDesignationStatusCommand({
                id: props.designation.id,
                status: 'trash'
              })
              .then(props.onClose)
          }
        >
          Supprimer
        </ConfirmButton>
      </div>
    </React.Fragment>
  );
};

export const EditDesignationDialog = (props: {
  designation: DesignationDto;
  display: boolean;
  onUpdate: () => Promise<void>;
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
            <DesignationPanel
              designation={props.designation}
              onClose={props.onClose}
              onUpdate={props.onUpdate}
            />
          </TabPanel>
          <TabPanel label="Suppression">
            <SuppressionPanel
              designation={props.designation}
              onClose={() => {
                props.onUpdate();
                props.onClose();
              }}
            />
          </TabPanel>
        </TabsContainer>
      </DialogContent>
    </Dialog>
  );
};
