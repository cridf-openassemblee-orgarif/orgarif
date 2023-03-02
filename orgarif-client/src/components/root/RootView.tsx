/** @jsxImportSource @emotion/react */
<<<<<<< HEAD:orgarif-client/src/view/RootView.tsx
import { css } from '@emotion/react';
import { Slide } from '@mui/material';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { BasicFiltersContainer } from '../container/BasicFiltersContainer';
import { FiltersContainer } from '../container/FiltersContainer';
import { MainContainer } from '../container/MainContainer';
import { TableContainer } from '../container/TableContainer';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { asString } from '../utils/nominal-class';
import { isMobile } from '../utils/viewport-utils';
=======
import { state } from '../../state/state';
import { MainContainer } from '../containers/MainContainer';
import { RouteLink } from '../routing/RouteLink';
import { ComponentsDemonstration } from './ComponentsDemonstration';
import { RouteLinkDemonstration } from './RouteLinkDemonstration';
import * as React from 'react';
import { useRecoilState } from 'recoil';
>>>>>>> template:orgarif-client/src/components/root/RootView.tsx

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
              <div key={asString(s.id)}>
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
<<<<<<< HEAD:orgarif-client/src/view/RootView.tsx
=======
      {userInfos && <div>You're connected</div>}
      <ComponentsDemonstration />
      <RouteLinkDemonstration />
      {userInfos && userInfos.roles.includes('Admin') && (
        <RouteLink
          route={{
            name: 'UsersManagementRoute'
          }}
        >
          Users management
        </RouteLink>
      )}
>>>>>>> template:orgarif-client/src/components/root/RootView.tsx
    </MainContainer>
  );
};
