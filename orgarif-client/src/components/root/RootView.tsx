/** @jsxImportSource @emotion/react */
import { state } from '../../state/state';
import { isMobile } from '../../utils/viewport-utils';
import { BasicFiltersContainer } from '../containers/BasicFiltersContainer';
import { FiltersContainer } from '../containers/FiltersContainer';
import { MainContainer } from '../containers/MainContainer';
import { TableContainer } from '../containers/TableContainer';
import { RouteLink } from '../routing/RouteLink';
import { css } from '@emotion/react';
import { Slide } from '@mui/material';
import * as React from 'react';
import { useRecoilState } from 'recoil';

export const RootView = () => {
  const [userInfos] = useRecoilState(state.userInfos);
  const [secteurs] = useRecoilState(state.secteurs);

  return (
    <MainContainer>
      {!userInfos && isMobile() && (
        <>
          <FiltersContainer />
          <TableContainer />
        </>
      )}
      {!userInfos && !isMobile() && (
        <Slide
          direction="up"
          in={true}
          timeout={400}
          mountOnEnter
          unmountOnExit
        >
          <div>
            <BasicFiltersContainer />
          </div>
        </Slide>
      )}

      {userInfos && (
        <div
          css={css`
            margin: auto;
            width: 80%;
            padding-top: 70px;
          `}
        >
          <RouteLink
            route={{
              name: 'OrganismesRoute'
            }}
          >
            Afficher le tableau des organismes
          </RouteLink>
          <h2>Liste des organismes</h2>
          <RouteLink
            route={{
              name: 'EditListOrganismesRoute'
            }}
          >
            Tous les organismes
          </RouteLink>
          <div
            css={css`
              padding-left: 20px;
            `}
          >
            <h3>Par secteur</h3>
            {secteurs.map(s => (
              <div key={s.id}>
                <RouteLink
                  route={{
                    name: 'ListOrganismesBySecteurRoute',
                    secteurId: s.id
                  }}
                >
                  {s.libelle}
                </RouteLink>
              </div>
            ))}
          </div>
          <h2>Édition des catégories</h2>
          <RouteLink
            route={{
              name: 'EditDepartementsRoute'
            }}
          >
            Édition des départements
          </RouteLink>
          <br />
          <RouteLink
            route={{
              name: 'EditSecteursRoute'
            }}
          >
            Édition des secteurs
          </RouteLink>
          <br />
          <RouteLink
            route={{
              name: 'EditNatureJuridiquesRoute'
            }}
          >
            Édition des natures juridiques
          </RouteLink>
          <br />
          <RouteLink
            route={{
              name: 'EditTypeStructuresRoute'
            }}
          >
            Édition des types de structure
          </RouteLink>
        </div>
      )}
    </MainContainer>
  );
};
