/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Edit } from '@mui/icons-material';
import { DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import * as React from 'react';
import { PropsWithChildren, ReactElement, useState } from 'react';
import { ItemStatus } from '../../domain/organisme';
import { assertUnreachable, clientUid } from '../../utils';
import { asString } from '../../utils/nominal-class';
import { TextInput } from '../base-component/TextInput';
import { classes } from './EditCategoriesComponent';

const editClass = asString(clientUid());

export const EditNomComponent = (
  props: PropsWithChildren<{
    kind: 'organisme' | 'instance';
    nom: string;
    onUpdateNom: (nom: string, then: () => void) => void;
    onUpdateStatus: (status: ItemStatus, then: () => void) => void;
    titleElement: ReactElement;
  }>
) => {
  const [displayPopup, setDisplayPopup] = useState(false);
  const [nom, setNom] = useState(props.nom);
  const cancel = () => {
    setNom(props.nom);
    setDisplayPopup(false);
  };
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
            onClick={() => setDisplayPopup(true)}
          >
            Éditer
          </Button>
        </div>
      </div>
      <Dialog open={displayPopup} onClose={cancel}>
        <DialogTitle>Édition</DialogTitle>
        <DialogContent>
          <div css={classes.editBlock}>
            <h3>Éditer libelle</h3>
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
                  props.onUpdateNom(nom, () => setDisplayPopup(false))
                }
              >
                Enregistrer
              </Button>
            </div>
          </div>
          <div css={classes.editBlock}>
            <h3>Archivage</h3>
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
                type="submit"
                variant="contained"
                color="warning"
                size="small"
                onClick={() =>
                  props.onUpdateStatus('archive', () => setDisplayPopup(false))
                }
              >
                Archiver
              </Button>
            </div>
          </div>
          <div css={classes.editBlock}>
            <h3>Suppression</h3>À utiliser en cas d'<b>erreur de saisie</b>{' '}
            uniquement.
            <div css={classes.editButton}>
              <Button
                type="submit"
                variant="contained"
                color="error"
                size="small"
                onClick={() =>
                  props.onUpdateStatus('trash', () => setDisplayPopup(false))
                }
              >
                Supprimer
              </Button>
            </div>
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