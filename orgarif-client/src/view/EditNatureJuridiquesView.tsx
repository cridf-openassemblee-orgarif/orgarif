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
import { NatureJuridique } from '../domain/bootstrap-data';
import { NatureJuridiqueId } from '../domain/ids';
import { Errors } from '../errors';
import { state } from '../state/state';
import { colors } from '../styles/vars';
import { asString } from '../utils/nominal-class';

const iconStyle = css`
  height: 1em;
  width: 1em;
  font-size: 18px;
`;

const EditNatureJuridiqueComponent = (props: {
  natureJuridique: NatureJuridique;
  displayDeletePopup: () => void;
  updateNatureJuridique: (
    id: NatureJuridiqueId,
    libelle: string
  ) => Promise<void>;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState(false);
  const updateLibelle = (event: FocusEvent<HTMLInputElement>) => {
    setEditMode(false);
    const newLibelle = event.currentTarget.value.trim();
    if (newLibelle !== props.natureJuridique.libelle && newLibelle !== '') {
      setUpdating(true);
      props
        .updateNatureJuridique(props.natureJuridique.id, newLibelle)
        .then(() => {
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
            initialValue={props.natureJuridique.libelle}
            mode={'appears-as-text'}
          />
        )}
        {editMode && (
          <TextInput
            name="libelle"
            initialValue={props.natureJuridique.libelle}
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

export const EditNatureJuridiquesView = () => {
  const [natureJuridiques, setNatureJuridiques] = useRecoilState(
    state.natureJuridiques
  );
  const [
    confirmNatureJuridiqueIdDeletion,
    setConfirmNatureJuridiqueIdDeletion
  ] = useState<NatureJuridiqueId | undefined>(undefined);
  const [deleteError, setDeleteError] = useState<string | undefined>(undefined);
  const hidePopup = () => {
    setConfirmNatureJuridiqueIdDeletion(undefined);
    setDeleteError(undefined);
  };
  const updateNatureJuridique = (
    natureJuridiqueId: NatureJuridiqueId,
    libelle: string
  ) => {
    if (!natureJuridiques) {
      throw Errors._bf153d36();
    }
    const p = appContext.commandService().updateNatureJuridiqueLibelleCommand({
      id: natureJuridiqueId,
      libelle
    });
    setNatureJuridiques(
      natureJuridiques.map(s =>
        s.id === natureJuridiqueId ? { ...s, libelle } : s
      )
    );
    return p;
  };
  const deleteNatureJuridique = (natureJuridiqueId: NatureJuridiqueId) => {
    if (!natureJuridiques) {
      throw Errors._51237480();
    }
    appContext
      .commandService()
      .deleteNatureJuridiqueCommand({
        id: natureJuridiqueId
      })
      .then(e => {
        setNatureJuridiques(
          natureJuridiques.filter(s => s.id !== natureJuridiqueId)
        );
        hidePopup();
      })
      .catch(e => {
        setDeleteError(e.message);
      });
  };
  return (
    <MainContainer>
      <h1>Édition des natures juridiques</h1>
      {natureJuridiques && (
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
            {natureJuridiques.map(n => (
              <EditNatureJuridiqueComponent
                // libelle needed in key, or it won't refresh when libelle is updated
                key={asString(n.id) + n.libelle}
                natureJuridique={n}
                displayDeletePopup={() =>
                  setConfirmNatureJuridiqueIdDeletion(n.id)
                }
                updateNatureJuridique={updateNatureJuridique}
              />
            ))}
          </tbody>
        </table>
      )}
      <Dialog open={!!confirmNatureJuridiqueIdDeletion} onClose={hidePopup}>
        <SimpleForm onSubmit={() => {}}>
          <DialogTitle>
            Êtes-vous sûr de vouloir supprimer la nature juridique ?
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
                if (!confirmNatureJuridiqueIdDeletion) {
                  throw Errors._952f03ee();
                }
                deleteNatureJuridique(confirmNatureJuridiqueIdDeletion);
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
