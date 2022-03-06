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
import { Errors } from '../errors';
import { state } from '../state/state';
import { compareByString } from '../utils';

export const EditSecteursView = () => {
  const [secteurs, setSecteurs] = useRecoilState(state.secteurs);
  const addSecteur = (libelle: string, then: () => void) => {
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
        then();
      });
  };
  const updateSecteur = (
    secteurId: SecteurId,
    libelle: string,
    then: () => void
  ) => {
    if (!secteurs) {
      throw Errors._c0c89407();
    }
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
        then();
      });
  };
  const onUpdateStatus = (
    id: SecteurId,
    status: ItemStatus,
    then: () => void
  ) => {
    appContext
      .commandService()
      .updateSecteurStatusCommand({
        id,
        status
      })
      .then(() => {
        setSecteurs(secteurs.map(s => (s.id === id ? { ...s, status } : s)));
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
        <h1>Édition des secteurs</h1>
        {secteurs && (
          <EditCategoriesComponent
            kind={'secteur'}
            categories={secteurs}
            onAdd={addSecteur}
            onChange={updateSecteur}
            onUpdateStatus={onUpdateStatus}
          />
        )}
      </div>
    </MainContainer>
  );
};
