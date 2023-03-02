/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Edit } from '@mui/icons-material';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { LienDeliberationDto } from '../../../../domain/organisme';
import { TabPanel, TabsContainer } from '../../../base-component/TabsContainer';
import { ConfirmButton } from '../../../base-component/ConfirmButton';
import { TextInput } from '../../../base-component/TextInput';
import { classes } from '../../../category/EditCategoriesComponent';
import { appContext } from '../../../../ApplicationContext';
import { LoadingButton } from '../../../base-component/LoadingButton';

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
                    appContext
                      .commandService()
                      .updateLienDeliberationCommentCommand({
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
                    appContext
                      .commandService()
                      .updateLienDeliberationStatusCommand({
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
