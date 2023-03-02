/** @jsxImportSource @emotion/react */
import { MainContainer } from '../components/containers/MainContainer';
import { EditCategoriesComponent } from '../components/root/category/EditCategoriesComponent';
import { CreateSecteurCommandResponse } from '../generated/command/commands';
import { Secteur } from '../generated/domain/bootstrap-data';
import { SecteurId } from '../generated/domain/ids';
import { ItemStatus } from '../generated/domain/organisme';
import { appContext } from '../services/ApplicationContext';
import { state } from '../state/state';
import { compareByString } from '../utils';
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilState } from 'recoil';

export const EditSecteursView = () => {
  const [secteurs, setSecteurs] = useRecoilState(state.secteurs);
  const addSecteur = (libelle: string) =>
    appContext
      .commandService()
      .send<CreateSecteurCommandResponse>({
        objectType: 'CreateSecteurCommand',
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
      .send({
        objectType: 'UpdateSecteurLibelleCommand',
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
      .send({
        objectType: 'UpdateSecteurStatusCommand',
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
