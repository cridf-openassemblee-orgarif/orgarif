/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Add, Edit } from '@mui/icons-material';
import { DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import * as React from 'react';
import { useState } from 'react';
import { Category, CategoryId } from '../../domain/bootstrap-data';
import { ItemStatus } from '../../domain/organisme';
import { colors } from '../../styles/vars';
import { assertUnreachable, clientUid } from '../../utils';
import { asString, NominalString } from '../../utils/nominal-class';
import { TextInput } from '../base-component/TextInput';
import { dialogClasses } from '../organisme/edit/dialog-common';

const buttonClass = asString(clientUid());

export const classes = {
  editButton: css`
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  `,
  table: css`
    border-spacing: 0;

    thead {
      td {
        padding: 10px 20px;
      }
    }

    tbody {
      tr {
        .${buttonClass} {
          visibility: hidden;
        }

        &:hover {
          .${buttonClass} {
            visibility: visible;
          }
        }
        &:nth-of-type(2n) {
          background-color: ${colors.clearGrey2};
        }
        &:not(:first-of-type) {
          td {
            border-top: 1px solid ${colors.grey2};
          }
        }
      }

      td {
        padding: 6px 20px;
      }
    }
  `
};

const EditCategoryComponent = (props: {
  kind: 'secteur' | 'typeStructure' | 'natureJuridique';
  category: Category;
  onChange: (id: CategoryId, libelle: string, then: () => void) => void;
  onUpdateStatus: (
    id: CategoryId,
    status: ItemStatus,
    then: () => void
  ) => void;
}) => {
  const [displayPopup, setDisplayPopup] = useState(false);
  const [updatedLibelle, setUpdatedLibelle] = useState(props.category.libelle);
  return (
    <React.Fragment>
      <tr>
        <td
          css={css`
            width: 500px;
          `}
        >
          {props.category.libelle}
        </td>
        <td>
          <Button
            variant="outlined"
            size="small"
            css={css`
              background: white;
            `}
            className={buttonClass}
            startIcon={<Edit />}
            onClick={() => setDisplayPopup(true)}
          >
            Éditer
          </Button>
        </td>
        <Dialog open={displayPopup} onClose={() => setDisplayPopup(false)}>
          <DialogTitle>Édition</DialogTitle>
          <DialogContent>
            <div css={dialogClasses.editBlock}>
              <h3>Éditer libelle</h3>
              <TextInput
                name="libelle"
                initialValue={props.category.libelle}
                onChange={l => setUpdatedLibelle(l.currentTarget.value)}
              />
              <div css={classes.editButton}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() =>
                    props.onChange(props.category.id, updatedLibelle, () =>
                      setDisplayPopup(false)
                    )
                  }
                >
                  Enregistrer
                </Button>
              </div>
            </div>
            <div css={dialogClasses.editBlock}>
              <h3>Archivage</h3>
              {(() => {
                switch (props.kind) {
                  case 'secteur':
                    return 'Le secteur';
                  case 'typeStructure':
                    return 'Le type de structure';
                  case 'natureJuridique':
                    return 'La nature juridique';
                  default:
                    assertUnreachable(props.kind);
                }
              })()}{' '}
              pourra être{' '}
              {(() => {
                switch (props.kind) {
                  case 'secteur':
                  case 'typeStructure':
                    return 'retrouvé';
                  case 'natureJuridique':
                    return 'retrouvée';
                  default:
                    assertUnreachable(props.kind);
                }
              })()}{' '}
              dans les archives. Si un organisme non archivé est encore
              référencé dans{' '}
              {(() => {
                switch (props.kind) {
                  case 'secteur':
                    return 'le secteur';
                  case 'typeStructure':
                    return 'le type de structure';
                  case 'natureJuridique':
                    return 'la nature juridique';
                  default:
                    assertUnreachable(props.kind);
                }
              })()}
              , une incohérence sera remontée.
              <div css={classes.editButton}>
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  size="small"
                  onClick={() =>
                    props.onUpdateStatus(props.category.id, 'archive', () =>
                      setDisplayPopup(false)
                    )
                  }
                >
                  Archiver
                </Button>
              </div>
            </div>
            <div css={dialogClasses.editBlock}>
              <h3>Suppression</h3>À utiliser en cas d'<b>erreur de saisie</b>{' '}
              uniquement. Si un organisme est encore référencé dans{' '}
              {(() => {
                switch (props.kind) {
                  case 'secteur':
                    return 'le secteur';
                  case 'typeStructure':
                    return 'le type de structure';
                  case 'natureJuridique':
                    return 'la nature juridique';
                  default:
                    assertUnreachable(props.kind);
                }
              })()}
              , une incohérence sera remontée.
              <div css={classes.editButton}>
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() =>
                    props.onUpdateStatus(props.category.id, 'trash', () =>
                      setDisplayPopup(false)
                    )
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
      </tr>
    </React.Fragment>
  );
};

export const EditCategoriesComponent = (props: {
  kind: 'secteur' | 'typeStructure' | 'natureJuridique';
  categories: Category[];
  onAdd: (libelle: string, then: () => void) => void;
  onChange: (id: NominalString<any>, libelle: string, then: () => void) => void;
  onUpdateStatus: (
    id: NominalString<any>,
    status: ItemStatus,
    then: () => void
  ) => void;
}) => {
  const live = props.categories.filter(c => c.status === 'live');
  const archive = props.categories.filter(c => c.status === 'archive');
  const [newCategoryLibelle, setNewCategoryLibelle] = useState('');
  const [displayAddPopup, setDisplayAddPopup] = useState(false);
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        size="small"
        css={css`
          background: white;
        `}
        startIcon={<Add />}
        onClick={() => setDisplayAddPopup(true)}
      >
        Ajouter
      </Button>
      <table css={classes.table}>
        <tbody>
          {live.map(c => (
            <EditCategoryComponent
              key={asString(c.id)}
              kind={props.kind}
              category={c}
              onChange={props.onChange}
              onUpdateStatus={props.onUpdateStatus}
            />
          ))}
        </tbody>
      </table>
      {archive.length !== 0 && (
        <React.Fragment>
          <div
            css={css`
              margin: 20px 0;
            `}
          >
            <h3>Archives</h3>
          </div>
          <table css={classes.table}>
            <tbody>
              {archive.map(c => (
                <EditCategoryComponent
                  key={asString(c.id)}
                  kind={props.kind}
                  category={c}
                  onChange={props.onChange}
                  onUpdateStatus={props.onUpdateStatus}
                />
              ))}
            </tbody>
          </table>
        </React.Fragment>
      )}
      <Dialog open={displayAddPopup} onClose={() => setDisplayAddPopup(false)}>
        <DialogTitle>Ajouter</DialogTitle>
        <DialogContent>
          <div css={dialogClasses.editBlock}>
            <h3>Libelle</h3>
            <TextInput
              name="libelle"
              initialValue={newCategoryLibelle}
              onChange={l => setNewCategoryLibelle(l.currentTarget.value)}
            />
            <div css={classes.editButton}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                onClick={() =>
                  props.onAdd(newCategoryLibelle, () =>
                    setDisplayAddPopup(false)
                  )
                }
              >
                Ajouter
              </Button>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDisplayAddPopup(false)} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
