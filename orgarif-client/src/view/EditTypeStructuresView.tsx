/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { EditCategoriesComponent } from '../component/edit/EditCategoriesComponent';
import { MainContainer } from '../container/MainContainer';
import { TypeStructure } from '../domain/bootstrap-data';
import { TypeStructureId } from '../domain/ids';
import { ItemStatus } from '../domain/organisme';
import { Errors } from '../errors';
import { state } from '../state/state';
import { compareByString } from '../utils';

export const EditTypeStructuresView = () => {
  const [typeStructures, setTypeStructures] = useRecoilState(
    state.typeStructures
  );
  const addTypeStructure = (libelle: string, then: () => void) => {
    appContext
      .commandService()
      .createTypeStructureCommand({
        libelle
      })
      .then(r => {
        const newTypeStructure: TypeStructure = {
          id: r.id,
          libelle,
          status: 'live'
        };
        setTypeStructures(
          [...typeStructures, newTypeStructure].sort(
            compareByString(i => i.libelle)
          )
        );
        then();
      });
  };
  const updateTypeStructure = (
    typeStructureId: TypeStructureId,
    libelle: string,
    then: () => void
  ) => {
    if (!typeStructures) {
      throw Errors._c0c89407();
    }
    appContext
      .commandService()
      .updateTypeStructureLibelleCommand({
        id: typeStructureId,
        libelle
      })
      .then(() => {
        setTypeStructures(
          typeStructures
            .map(s => (s.id === typeStructureId ? { ...s, libelle } : s))
            .sort(compareByString(i => i.libelle))
        );
        then();
      });
  };
  const onUpdateStatus = (
    id: TypeStructureId,
    status: ItemStatus,
    then: () => void
  ) => {
    appContext
      .commandService()
      .updateTypeStructureStatusCommand({
        id,
        status
      })
      .then(() => {
        setTypeStructures(
          typeStructures.map(s => (s.id === id ? { ...s, status } : s))
        );
        then();
      });
  };
  return (
    <MainContainer>
      <div
        css={css`
          padding: 0 20px;
        `}
      >
        <h1>Édition des type de structure</h1>
        {typeStructures && (
          <EditCategoriesComponent
            kind={'typeStructure'}
            categories={typeStructures}
            onAdd={addTypeStructure}
            onChange={updateTypeStructure}
            onUpdateStatus={onUpdateStatus}
          />
        )}
      </div>
    </MainContainer>
  );
};
