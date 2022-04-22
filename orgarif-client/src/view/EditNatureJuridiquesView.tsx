/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { EditCategoriesComponent } from '../component/category/EditCategoriesComponent';
import { MainContainer } from '../container/MainContainer';
import { NatureJuridique } from '../domain/bootstrap-data';
import { NatureJuridiqueId } from '../domain/ids';
import { ItemStatus } from '../domain/organisme';
import { state } from '../state/state';
import { compareByString } from '../utils';

export const EditNatureJuridiquesView = () => {
  const [natureJuridiques, setNatureJuridiques] = useRecoilState(
    state.natureJuridiques
  );
  const addNatureJuridique = (libelle: string) =>
    appContext
      .commandService()
      .createNatureJuridiqueCommand({
        libelle
      })
      .then(r => {
        const newNatureJuridique: NatureJuridique = {
          id: r.id,
          libelle,
          status: 'live'
        };
        setNatureJuridiques(
          [...natureJuridiques, newNatureJuridique].sort(
            compareByString(i => i.libelle)
          )
        );
      });
  const updateNatureJuridique = (
    natureJuridiqueId: NatureJuridiqueId,
    libelle: string
  ) =>
    appContext
      .commandService()
      .updateNatureJuridiqueLibelleCommand({
        id: natureJuridiqueId,
        libelle
      })
      .then(() => {
        setNatureJuridiques(
          natureJuridiques
            .map(s => (s.id === natureJuridiqueId ? { ...s, libelle } : s))
            .sort(compareByString(i => i.libelle))
        );
      });
  const onUpdateStatus = (id: NatureJuridiqueId, status: ItemStatus) =>
    appContext
      .commandService()
      .updateNatureJuridiqueStatusCommand({
        id,
        status
      })
      .then(() => {
        setNatureJuridiques(
          natureJuridiques.map(s => (s.id === id ? { ...s, status } : s))
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
        <h1>Édition des natures juridiques</h1>
        <EditCategoriesComponent
          kind={'natureJuridique'}
          categories={natureJuridiques}
          hasCode={false}
          onAdd={addNatureJuridique}
          onChange={updateNatureJuridique}
          onUpdateStatus={onUpdateStatus}
        />
      </div>
    </MainContainer>
  );
};
