/** @jsxImportSource @emotion/react */
import { MainContainer } from '../components/containers/MainContainer';
import { EditCategoriesComponent } from '../components/root/category/EditCategoriesComponent';
import { CreateTypeStructureCommandResponse } from '../generated/command/commands';
import { TypeStructure } from '../generated/domain/bootstrap-data';
import { TypeStructureId } from '../generated/domain/ids';
import { ItemStatus } from '../generated/domain/organisme';
import { appContext } from '../services/ApplicationContext';
import { state } from '../state/state';
import { sortCategory } from '../utils/filters';
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilState } from 'recoil';

export const EditTypeStructuresView = () => {
  const [categories, setCategories] = useRecoilState(state.categories);
  const addTypeStructure = (libelle: string) =>
    appContext
      .commandService()
      .send<CreateTypeStructureCommandResponse>({
        objectType: 'CreateTypeStructureCommand',
        libelle
      })
      .then(r => {
        const newTypeStructure: TypeStructure = {
          id: r.id,
          libelle,
          status: 'live'
        };
        setCategories({
          ...categories,
          typeStructures: sortCategory([
            ...categories.typeStructures,
            newTypeStructure
          ])
        });
      });
  const updateTypeStructure = (
    typeStructureId: TypeStructureId,
    libelle: string
  ) =>
    appContext
      .commandService()
      .send({
        objectType: 'UpdateTypeStructureLibelleCommand',
        id: typeStructureId,
        libelle
      })
      .then(() =>
        setCategories({
          ...categories,
          typeStructures: sortCategory(
            categories.typeStructures.map(s =>
              s.id === typeStructureId ? { ...s, libelle } : s
            )
          )
        })
      );
  const onUpdateStatus = (id: TypeStructureId, status: ItemStatus) =>
    appContext
      .commandService()
      .send({ objectType: 'UpdateTypeStructureStatusCommand', id, status })
      .then(() =>
        setCategories({
          ...categories,
          typeStructures: categories.typeStructures.map(s =>
            s.id === id ? { ...s, status } : s
          )
        })
      );
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
          categories={categories.typeStructures}
          hasCode={false}
          onAdd={addTypeStructure}
          onChange={updateTypeStructure}
          onUpdateStatus={onUpdateStatus}
        />
      </div>
    </MainContainer>
  );
};
