/** @jsxImportSource @emotion/react */
import { LocalDate } from '../../../../../domain/datetime';
import { DesignationDto } from '../../../../../generated/domain/Organisme.generated';
import { appContext } from '../../../../../services/ApplicationContext';
import { nominal } from '../../../../../utils/nominal-class';
import { LoadingButton } from '../../../../common/LoadingButton';
import { ConfirmButton } from '../../../../common/form/ConfirmButton';
import { TabPanel, TabsContainer } from '../../../../common/form/TabsContainer';
import { TextInput } from '../../../../common/form/TextInput';
import { classes } from '../../../category/EditCategoriesComponent';
import { dialogClasses } from '../dialog-common';
import { css } from '@emotion/react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

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
    props.designation.endDate
  );
  const submit = () => {
    return appContext.commandService
      .send({
        objectType: 'UpdateDesignationDatesCommand',
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
          initialValue={props.designation.startDate ?? ''}
          onChange={e =>
            setStartDate(
              e.currentTarget.value
                ? nominal<LocalDate>(e.currentTarget.value)
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
          initialValue={props.designation.endDate ?? ''}
          onChange={e =>
            setEndDate(
              e.currentTarget.value
                ? nominal<LocalDate>(e.currentTarget.value)
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
        <LoadingButton onClick={submit}>Enregistrer</LoadingButton>
        <Button onClick={props.onClose} color="primary">
          Annuler
        </Button>
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
        <ConfirmButton
          dialogTitle="Supprimer la désignation"
          okButton="Supprimer"
          cancelButton="Annuler"
          color="error"
          onConfirm={() =>
            appContext.commandService
              .send({
                objectType: 'UpdateDesignationStatusCommand',
                id: props.designation.id,
                status: 'trash'
              })
              .then(props.onClose)
          }
        >
          Supprimer
        </ConfirmButton>
        <Button onClick={props.onClose} color="primary">
          Annuler
        </Button>
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
