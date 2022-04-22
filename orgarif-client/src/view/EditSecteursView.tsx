/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { EditCategoriesComponent } from '../component/category/EditCategoriesComponent';
import { MainContainer } from '../container/MainContainer';
import { Secteur } from '../domain/bootstrap-data';
import { SecteurId } from '../domain/ids';
import { ItemStatus } from '../domain/organisme';
import { state } from '../state/state';
import { compareByString } from '../utils';

export const EditSecteursView = () => {
  const [secteurs, setSecteurs] = useRecoilState(state.secteurs);
  const addSecteur = (libelle: string) =>
    appContext
      .commandService()
      .createSecteurCommand({
        libelle
      })
      .then(r => {
        const newSecteur: Secteur = { id: r.id, libelle, status: 'live' };
        setSecteurs(
          [...secteurs, newSecteur].sort(compareByString(i => i.libelle))
        );
      });
  const updateSecteur = (secteurId: SecteurId, libelle: string) =>
    appContext
      .commandService()
      .updateSecteurLibelleCommand({
        id: secteurId,
        libelle
      })
      .then(() => {
        setSecteurs(
          secteurs
            .map(s => (s.id === secteurId ? { ...s, libelle } : s))
            .sort(compareByString(i => i.libelle))
        );
      });
  const onUpdateStatus = (id: SecteurId, status: ItemStatus) =>
    appContext
      .commandService()
      .updateSecteurStatusCommand({
        id,
        status
      })
      .then(() => {
        setSecteurs(secteurs.map(s => (s.id === id ? { ...s, status } : s)));
      });
  return (
    <MainContainer>
      <div
        css={css`
          padding: 0 20px;
          padding-top: 70px;
        `}
      >
        <h1>Édition des secteurs</h1>
        <EditCategoriesComponent
          kind={'secteur'}
          categories={secteurs}
          hasCode={false}
          onAdd={addSecteur}
          onChange={updateSecteur}
          onUpdateStatus={onUpdateStatus}
        />
      </div>
    </MainContainer>
  );
};
