/** @jsxImportSource @emotion/react */
import { ItemStatus } from '../../../../generated/domain/organisme';
import { assertUnreachable, clientUid } from '../../../../utils';
import { ConfirmButton } from '../../../common/form/ConfirmButton';
import { TabPanel, TabsContainer } from '../../../common/form/TabsContainer';
import { TextInput } from '../../../common/form/TextInput';
import { ApplicationRoute } from '../../../routing/routes';
import { useGoTo } from '../../../routing/routing-utils';
import { classes } from '../../category/EditCategoriesComponent';
import { dialogClasses } from './dialog-common';
import { css } from '@emotion/react';
import { Edit } from '@mui/icons-material';
import { DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';

const editClass = clientUid();

// TODO naming pas fou vu que ça fait d'autre truc
export const EditNomComponent = (
  props: PropsWithChildren<{
    kind: 'organisme' | 'instance';
    nom: string;
    onUpdateNom: (nom: string) => Promise<void>;
    onUpdateStatus: (status: ItemStatus) => Promise<void>;
    titleElement: ReactElement;
    deletionReturnRoute?: ApplicationRoute;
  }>
) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [nom, setNom] = useState(props.nom);
  useEffect(() => setNom(props.nom), [props.nom]);
  const cancel = () => {
    setNom(props.nom);
    setDisplayDialog(false);
  };
  const goTo = useGoTo();
  return (
    <React.Fragment>
      <div
        css={css`
          position: relative;
          padding-left: 50px;
          display: flex;

          .${editClass} {
            visibility: hidden;
          }

          &:hover {
            .${editClass} {
              visibility: visible;
            }
          }
        `}
      >
        {React.cloneElement(props.titleElement, {
          children: props.nom
        })}
        <div
          css={css`
            margin: auto 40px;
          `}
        >
          <Button
            variant="outlined"
            size="small"
            css={css`
              background: white;
            `}
            className={editClass}
            startIcon={<Edit />}
            onClick={() => setDisplayDialog(true)}
          >
            Modifier
          </Button>
        </div>
      </div>
      <Dialog open={displayDialog} onClose={cancel}>
        <DialogTitle>Édition</DialogTitle>
        <DialogContent>
          <TabsContainer>
            <TabPanel label="Modifier libellé">
              <div css={dialogClasses.editBlock}>
                <TextInput
                  name="libelle"
                  initialValue={nom}
                  onChange={value => setNom(value.currentTarget.value)}
                />
                <div css={classes.editButton}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() =>
                      props.onUpdateNom(nom).then(() => setDisplayDialog(false))
                    }
                  >
                    Enregistrer
                  </Button>
                  <Button
                    onClick={() => setDisplayDialog(false)}
                    color="primary"
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </TabPanel>
            <TabPanel label="Archivage">
              <div css={dialogClasses.editBlock}>
                {(() => {
                  switch (props.kind) {
                    case 'organisme':
                      return "L'organisme pourra être retrouvé";
                    case 'instance':
                      return "L'instance pourra être retrouvée";
                    default:
                      assertUnreachable(props.kind);
                  }
                })()}{' '}
                dans les archives.
                <div css={classes.editButton}>
                  <Button
                    onClick={() => setDisplayDialog(false)}
                    color="primary"
                  >
                    Annuler
                  </Button>
                  <ConfirmButton
                    color="warning"
                    onConfirm={() =>
                      props.onUpdateStatus('archive').then(() => {
                        setDisplayDialog(false);
                        if (props.deletionReturnRoute) {
                          goTo(props.deletionReturnRoute);
                        }
                      })
                    }
                    dialogTitle="Confirmation de l'archivage"
                    cancelButton="Annuler"
                    okButton="Archiver"
                  >
                    Archiver
                  </ConfirmButton>
                </div>
              </div>
            </TabPanel>
            <TabPanel label="Suppression">
              <div css={dialogClasses.editBlock}>
                <p>
                  À utiliser en cas d'
                  <b>erreur de saisie</b> uniquement.
                </p>
                <div css={classes.editButton}>
                  <Button
                    onClick={() => setDisplayDialog(false)}
                    color="primary"
                  >
                    Annuler
                  </Button>
                  <ConfirmButton
                    color="error"
                    onConfirm={() =>
                      props.onUpdateStatus('trash').then(() => {
                        setDisplayDialog(false);
                        if (props.deletionReturnRoute) {
                          goTo(props.deletionReturnRoute);
                        }
                      })
                    }
                    dialogTitle="Confirmation de la suppression"
                    cancelButton="Annuler"
                    okButton="Supprimer"
                  >
                    Supprimer
                  </ConfirmButton>
                </div>
              </div>
            </TabPanel>
          </TabsContainer>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
