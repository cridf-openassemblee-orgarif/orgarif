/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { EditCategoriesComponent } from '../component/category/EditCategoriesComponent';
import { MainContainer } from '../container/MainContainer';
import { Departement } from '../domain/bootstrap-data';
import { DepartementId } from '../domain/ids';
import { ItemStatus } from '../domain/organisme';
import { Errors } from '../errors';
import { state } from '../state/state';
import { compareByString } from '../utils';
import { NominalString } from '../utils/nominal-class';

export const EditDepartementsView = () => {
  const [departements, setDepartements] = useRecoilState(state.departements);
  const addDepartement = (libelle: string, code: string) =>
    appContext
      .commandService()
      .createDepartementCommand({
        libelle,
        code
      })
      .then(r => {
        const newDepartement: Departement = {
          id: r.id,
          libelle,
          code,
          status: 'live'
        };
        setDepartements(
          [...departements, newDepartement].sort(
            compareByString(i => i.libelle)
          )
        );
      });
  const updateDepartement = (
    departementId: DepartementId,
    libelle: string,
    code: string
  ) =>
    appContext
      .commandService()
      .updateDepartementCommand({
        id: departementId,
        libelle,
        code
      })
      .then(() => {
        setDepartements(
          departements
            .map(s => (s.id === departementId ? { ...s, libelle, code } : s))
            .sort(compareByString(i => i.code))
        );
      });
  const onUpdateStatus = (id: DepartementId, status: ItemStatus) =>
    appContext
      .commandService()
      .updateDepartementStatusCommand({
        id,
        status
      })
      .then(() => {
        setDepartements(
          departements.map(s => (s.id === id ? { ...s, status } : s))
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
        <h1>Édition des départements</h1>
        <EditCategoriesComponent
          kind={'departement'}
          categories={departements}
          hasCode={true}
          onAdd={(libelle: string, code?: string) => {
            if (!code) {
              throw Errors._52b81c0f;
            }
            return addDepartement(libelle, code);
          }}
          onChange={(
            id: NominalString<any>,
            libelle: string,
            code?: string
          ) => {
            if (!code) {
              throw Errors._89de521f;
            }
            return updateDepartement(id, libelle, code);
          }}
          onUpdateStatus={onUpdateStatus}
        />
      </div>
    </MainContainer>
  );
};
