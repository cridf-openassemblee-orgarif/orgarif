/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { EditCategoriesComponent } from '../component/category/EditCategoriesComponent';
import { MainContainer } from '../container/MainContainer';
import { TypeStructure } from '../domain/bootstrap-data';
import { TypeStructureId } from '../domain/ids';
import { ItemStatus } from '../domain/organisme';
import { state } from '../state/state';
import { compareByString } from '../utils';

export const EditTypeStructuresView = () => {
  const [typeStructures, setTypeStructures] = useRecoilState(
    state.typeStructures
  );
  const addTypeStructure = (libelle: string) =>
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
      });
  const updateTypeStructure = (
    typeStructureId: TypeStructureId,
    libelle: string
  ) =>
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
      });
  const onUpdateStatus = (id: TypeStructureId, status: ItemStatus) =>
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
      });
  return (
    <MainContainer>
      <div
        css={css`
          padding: 0 20px;
          padding-top: 70px;
        `}
      >
        <h1>Édition des type de structure</h1>
        <EditCategoriesComponent
          kind={'typeStructure'}
          categories={typeStructures}
          hasCode={false}
          onAdd={addTypeStructure}
          onChange={updateTypeStructure}
          onUpdateStatus={onUpdateStatus}
        />
      </div>
    </MainContainer>
  );
};
