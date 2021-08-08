/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  CircularProgress,
  DialogContent,
  DialogTitle,
  Fab
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';
import { FocusEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { SimpleForm } from '../component/base-component/SimpleForm';
import { TextInput } from '../component/base-component/TextInput';
import { MainContainer } from '../container/MainContainer';
import { TypeStructure } from '../domain/bootstrap-data';
import { TypeStructureId } from '../domain/ids';
import { Errors } from '../errors';
import { state } from '../state/state';
import { colors } from '../styles/vars';
import { stringifyNominalString } from '../utils/nominal-class';

const iconStyle = css`
  height: 1em;
  width: 1em;
  font-size: 18px;
`;

const EditTypeStructureComponent = (props: {
  typeStructure: TypeStructure;
  displayDeletePopup: () => void;
  updateTypeStructure: (id: TypeStructureId, libelle: string) => Promise<void>;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState(false);
  const updateLibelle = (event: FocusEvent<HTMLInputElement>) => {
    setEditMode(false);
    const newLibelle = event.currentTarget.value.trim();
    if (newLibelle !== props.typeStructure.libelle && newLibelle !== '') {
      setUpdating(true);
      props.updateTypeStructure(props.typeStructure.id, newLibelle).then(() => {
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
            initialValue={props.typeStructure.libelle}
            mode={'appears-as-text'}
          />
        )}
        {editMode && (
          <TextInput
            name="libelle"
            initialValue={props.typeStructure.libelle}
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
            <EditIcon css={iconStyle} />
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
          <DeleteIcon css={iconStyle} />
        </Fab>
      </td>
    </tr>
  );
};

export const EditTypeStructuresView = () => {
  const [typeStructures, setTypeStructures] = useRecoilState(
    state.typeStructures
  );
  const [confirmTypeStructureIdDeletion, setConfirmTypeStructureIdDeletion] =
    useState<TypeStructureId | undefined>(undefined);
  const [deleteError, setDeleteError] = useState<string | undefined>(undefined);
  const hidePopup = () => {
    setConfirmTypeStructureIdDeletion(undefined);
    setDeleteError(undefined);
  };
  const updateTypeStructure = (
    typeStructureId: TypeStructureId,
    libelle: string
  ) => {
    if (!typeStructures) {
      throw Errors._89de521f();
    }
    const p = appContext.commandService().updateTypeStructureLibelleCommand({
      id: typeStructureId,
      libelle
    });
    setTypeStructures(
      typeStructures.map(s =>
        s.id === typeStructureId ? { ...s, libelle } : s
      )
    );
    return p;
  };
  const deleteTypeStructure = (typeStructureId: TypeStructureId) => {
    if (!typeStructures) {
      throw Errors._52b81c0f();
    }
    appContext
      .commandService()
      .deleteTypeStructureCommand({
        id: typeStructureId
      })
      .then(() => {
        setTypeStructures(typeStructures.filter(s => s.id !== typeStructureId));
        hidePopup();
      })
      .catch(e => {
        setDeleteError(e.message);
      });
  };
  return (
    <MainContainer>
      <h1>Édition des types de structure</h1>
      {typeStructures && (
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
            {typeStructures.map(n => (
              <EditTypeStructureComponent
                // libelle needed in key, or it won't refresh when libelle is updated
                key={stringifyNominalString(n.id) + n.libelle}
                typeStructure={n}
                displayDeletePopup={() =>
                  setConfirmTypeStructureIdDeletion(n.id)
                }
                updateTypeStructure={updateTypeStructure}
              />
            ))}
          </tbody>
        </table>
      )}
      <Dialog open={!!confirmTypeStructureIdDeletion} onClose={hidePopup}>
        <SimpleForm onSubmit={() => {}}>
          <DialogTitle>
            Êtes-vous sûr de vouloir supprimer le type de structure ?
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
                if (!confirmTypeStructureIdDeletion) {
                  throw Errors._a5ef6b39();
                }
                deleteTypeStructure(confirmTypeStructureIdDeletion);
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
