/** @jsxImportSource @emotion/react */
import { MainContainer } from '../components/containers/MainContainer';
import { EditCategoriesComponent } from '../components/root/category/EditCategoriesComponent';
import { CreateNatureJuridiqueCommandResponse } from '../generated/command/Commands.generated';
import { NatureJuridique } from '../generated/domain/BootstrapData.generated';
import { NatureJuridiqueId } from '../generated/domain/Ids.generated';
import { ItemStatus } from '../generated/domain/Organisme.generated';
import { appContext } from '../services/ApplicationContext';
import { state } from '../state/state';
import { sortCategory } from '../utils/filters';
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilState } from 'recoil';

export const EditNatureJuridiquesView = () => {
  const [categories, setCategories] = useRecoilState(state.categories);
  const addNatureJuridique = (libelle: string) =>
    appContext.commandService
      .send<CreateNatureJuridiqueCommandResponse>({
        objectType: 'CreateNatureJuridiqueCommand',
        libelle
      })
      .then(r => {
        const newNatureJuridique: NatureJuridique = {
          id: r.id,
          libelle,
          status: 'live'
        };
        setCategories({
          ...categories,
          natureJuridiques: sortCategory([
            ...categories.natureJuridiques,
            newNatureJuridique
          ])
        });
      });
  const updateNatureJuridique = (
    natureJuridiqueId: NatureJuridiqueId,
    libelle: string
  ) =>
    appContext.commandService
      .send({
        objectType: 'UpdateNatureJuridiqueLibelleCommand',
        id: natureJuridiqueId,
        libelle
      })
      .then(() =>
        setCategories({
          ...categories,
          natureJuridiques: sortCategory(
            categories.natureJuridiques.map(s =>
              s.id === natureJuridiqueId ? { ...s, libelle } : s
            )
          )
        })
      );
  const onUpdateStatus = (id: NatureJuridiqueId, status: ItemStatus) =>
    appContext.commandService
      .send({ objectType: 'UpdateNatureJuridiqueStatusCommand', id, status })
      .then(() =>
        setCategories({
          ...categories,
          natureJuridiques: categories.natureJuridiques.map(s =>
            s.id === id ? { ...s, status } : s
          )
        })
      );
  return (
    <MainContainer>
      <div
        css={css`
          padding: 0 20px;
        `}
      >
        <h1>Édition des natures juridiques</h1>
        <EditCategoriesComponent
          kind={'natureJuridique'}
          categoryList={categories.natureJuridiques}
          hasCode={false}
          onAdd={addNatureJuridique}
          onChange={updateNatureJuridique}
          onUpdateStatus={onUpdateStatus}
        />
      </div>
    </MainContainer>
  );
};
