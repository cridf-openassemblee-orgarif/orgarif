/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Delete, Edit } from '@mui/icons-material';
import {
  CircularProgress,
  DialogContent,
  DialogTitle,
  Fab
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import * as React from 'react';
import { FocusEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { SimpleForm } from '../component/base-component/SimpleForm';
import { TextInput } from '../component/base-component/TextInput';
import { MainContainer } from '../container/MainContainer';
import { Secteur } from '../domain/bootstrap-data';
import { SecteurId } from '../domain/ids';
import { Errors } from '../errors';
import { state } from '../state/state';
import { colors } from '../styles/vars';
import { asString } from '../utils/nominal-class';

const iconStyle = css`
  height: 1em;
  width: 1em;
  font-size: 18px;
`;

const EditSecteurComponent = (props: {
  secteur: Secteur;
  displayDeletePopup: () => void;
  updateSecteur: (id: SecteurId, libelle: string) => Promise<void>;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState(false);
  const updateLibelle = (event: FocusEvent<HTMLInputElement>) => {
    setEditMode(false);
    const newLibelle = event.currentTarget.value.trim();
    if (newLibelle !== props.secteur.libelle && newLibelle !== '') {
      setUpdating(true);
      props.updateSecteur(props.secteur.id, newLibelle).then(() => {
        setUpdating(false);
      });
    }
  };
  return (
    <tr>
      <td
        css={css`
          width: 500px;
        `}
      >
        {!editMode && (
          <TextInput
            name="libelle"
            initialValue={props.secteur.libelle}
            mode={'appears-as-text'}
          />
        )}
        {editMode && (
          <TextInput
            name="libelle"
            initialValue={props.secteur.libelle}
            autoFocus={true}
            onBlur={updateLibelle}
          />
        )}
      </td>
      <td>
        {!updating && (
          <Fab
            onClick={() => setEditMode(true)}
            size="small"
            variant="extended"
          >
            <Edit css={iconStyle} />
          </Fab>
        )}
        {updating && (
          <Fab disabled={true} size="small" variant="extended">
            <CircularProgress size={16} />
          </Fab>
        )}
        <Fab
          onClick={props.displayDeletePopup}
          size="small"
          variant="extended"
          style={{ marginLeft: '10px' }}
        >
          <Delete css={iconStyle} />
        </Fab>
      </td>
    </tr>
  );
};

export const EditSecteursView = () => {
  const [secteurs, setSecteurs] = useRecoilState(state.secteurs);
  const [confirmSecteurIdDeletion, setConfirmSecteurIdDeletion] = useState<
    SecteurId | undefined
  >(undefined);
  const [deleteError, setDeleteError] = useState<string | undefined>(undefined);
  const hidePopup = () => {
    setConfirmSecteurIdDeletion(undefined);
    setDeleteError(undefined);
  };
  const updateSecteur = (secteurId: SecteurId, libelle: string) => {
    if (!secteurs) {
      throw Errors._c0c89407();
    }
    const p = appContext.commandService().updateSecteurLibelleCommand({
      id: secteurId,
      libelle
    });
    setSecteurs(
      secteurs.map(s => (s.id === secteurId ? { ...s, libelle } : s))
    );
    return p;
  };
  const deleteSecteur = (secteurId: SecteurId) => {
    if (!secteurs) {
      throw Errors._06c0f351();
    }
    appContext
      .commandService()
      .deleteSecteurCommand({
        id: secteurId
      })
      .then(() => {
        setSecteurs(secteurs.filter(s => s.id !== secteurId));
        hidePopup();
      })
      .catch(e => {
        setDeleteError(e.message);
      });
  };
  return (
    <MainContainer>
      <h1>Édition des secteurs</h1>
      {secteurs && (
        <table
          css={css`
            border-spacing: 0;

            thead {
              td {
                padding: 10px 20px;
              }
            }

            tbody {
              td {
                border-top: 1px solid ${colors.grey2};
                padding: 6px 20px;
              }

              tr {
                &:nth-of-type(2n) {
                  background-color: ${colors.clearGrey2};
                }
              }
            }
          `}
        >
          <tbody>
            {secteurs.map(s => (
              <EditSecteurComponent
                // libelle needed in key, or it won't refresh when libelle is updated
                key={asString(s.id) + s.libelle}
                secteur={s}
                displayDeletePopup={() => setConfirmSecteurIdDeletion(s.id)}
                updateSecteur={updateSecteur}
              />
            ))}
          </tbody>
        </table>
      )}
      <Dialog open={!!confirmSecteurIdDeletion} onClose={hidePopup}>
        <SimpleForm onSubmit={() => {}}>
          <DialogTitle>
            Êtes-vous sûr de vouloir supprimer le secteur ?
          </DialogTitle>
          <DialogContent>
            {deleteError && (
              <div
                css={css`
                  color: ${colors.errorRed};
                  font-weight: bold;
                `}
              >
                {deleteError}
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={hidePopup} color="primary">
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                if (!confirmSecteurIdDeletion) {
                  throw Errors._2c740dc6();
                }
                deleteSecteur(confirmSecteurIdDeletion);
              }}
            >
              Supprimer
            </Button>
          </DialogActions>
        </SimpleForm>
      </Dialog>
    </MainContainer>
  );
};
