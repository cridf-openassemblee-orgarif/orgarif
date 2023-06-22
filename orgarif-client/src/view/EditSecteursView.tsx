/** @jsxImportSource @emotion/react */
import { MainContainer } from '../components/containers/MainContainer';
import { EditCategoriesComponent } from '../components/root/category/EditCategoriesComponent';
import { CreateSecteurCommandResponse } from '../generated/command/commands';
import { Secteur } from '../generated/domain/bootstrap-data';
import { SecteurId } from '../generated/domain/ids';
import { ItemStatus } from '../generated/domain/organisme';
import { appContext } from '../services/ApplicationContext';
import { state } from '../state/state';
import { sortCategory } from '../utils/filters';
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilState } from 'recoil';

export const EditSecteursView = () => {
  const [categories, setCategories] = useRecoilState(state.categories);
  const addSecteur = (libelle: string) =>
    appContext.commandService
      .send<CreateSecteurCommandResponse>({
        objectType: 'CreateSecteurCommand',
        libelle
      })
      .then(r => {
        const newSecteur: Secteur = { id: r.id, libelle, status: 'live' };
        setCategories({
          ...categories,
          secteurs: sortCategory([...categories.secteurs, newSecteur])
        });
      });
  const updateSecteur = (secteurId: SecteurId, libelle: string) =>
    appContext.commandService
      .send({
        objectType: 'UpdateSecteurLibelleCommand',
        id: secteurId,
        libelle
      })
      .then(() =>
        setCategories({
          ...categories,
          secteurs: sortCategory(
            categories.secteurs.map(s =>
              s.id === secteurId ? { ...s, libelle } : s
            )
          )
        })
      );
  const onUpdateStatus = (id: SecteurId, status: ItemStatus) =>
    appContext.commandService
      .send({
        objectType: 'UpdateSecteurStatusCommand',
        id,
        status
      })
      .then(() =>
        setCategories({
          ...categories,
          secteurs: categories.secteurs.map(s =>
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
        <h1>Édition des secteurs</h1>
        <EditCategoriesComponent
          kind={'secteur'}
          categoryList={categories.secteurs}
          hasCode={false}
          onAdd={addSecteur}
          onChange={updateSecteur}
          onUpdateStatus={onUpdateStatus}
        />
      </div>
    </MainContainer>
  );
};
