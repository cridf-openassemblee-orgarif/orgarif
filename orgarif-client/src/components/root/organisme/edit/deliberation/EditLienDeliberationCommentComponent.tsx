/** @jsxImportSource @emotion/react */
import { LienDeliberationDto } from '../../../../../generated/domain/organisme';
import { appContext } from '../../../../../services/ApplicationContext';
import { LoadingButton } from '../../../../common/LoadingButton';
import { ConfirmButton } from '../../../../common/form/ConfirmButton';
import { TabPanel, TabsContainer } from '../../../../common/form/TabsContainer';
import { TextInput } from '../../../../common/form/TextInput';
import { classes } from '../../../category/EditCategoriesComponent';
import { css } from '@emotion/react';
import { Edit } from '@mui/icons-material';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';

export const EditLienDeliberationCommentComponent = (props: {
  lienDeliberation: LienDeliberationDto;
  onUpdate: () => Promise<void>;
}) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [comment, setComment] = useState(props.lienDeliberation.comment);
  useEffect(
    () => setComment(props.lienDeliberation.comment),
    [props.lienDeliberation]
  );
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color={'error'}
        css={css`
          background: white;
        `}
        startIcon={<Edit />}
        onClick={() => setDisplayDialog(true)}
      >
        Modifier
      </Button>
      <Dialog
        open={displayDialog}
        onClose={() => setDisplayDialog(false)}
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle>Modifier</DialogTitle>
        <DialogContent>
          <TabsContainer>
            <TabPanel label="Commentaire">
              <TextInput
                name="comment"
                label="Commentaire"
                multiline={true}
                multilineDefaultRows={3}
                initialValue={comment}
                onChange={e => setComment(e.currentTarget.value)}
              />
              <div
                css={css`
                  ${classes.editButton}
                  padding-top: 40px;
                `}
              >
                <LoadingButton
                  onClick={() =>
                    appContext.commandService
                      .send({
                        objectType: 'UpdateLienDeliberationCommentCommand',
                        id: props.lienDeliberation.id,
                        comment
                      })
                      .then(props.onUpdate)
                      .then(() => setDisplayDialog(false))
                  }
                >
                  Enregistrer
                </LoadingButton>
              </div>
            </TabPanel>
            <TabPanel label="Suppression">
              <div>
                La suppression est définitive et sert à corriger les erreurs de
                saisie uniquement.
              </div>
              <div
                css={css`
                  ${classes.editButton}
                  padding-top: 40px;
                `}
              >
                <ConfirmButton
                  onConfirm={() =>
                    appContext.commandService
                      .send({
                        objectType: 'UpdateLienDeliberationStatusCommand',
                        id: props.lienDeliberation.id,
                        status: 'trash'
                      })
                      .then(props.onUpdate)
                      .then(() => setDisplayDialog(false))
                  }
                  dialogTitle="Êtes-vous sûr de vouloir supprimer le lien à la délibération ?"
                  okButton="Supprimer"
                  cancelButton="Annuler"
                >
                  Supprimer
                </ConfirmButton>
              </div>
            </TabPanel>
          </TabsContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};
