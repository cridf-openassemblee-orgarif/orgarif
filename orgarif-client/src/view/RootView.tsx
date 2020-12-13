/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { MainContainer } from '../container/MainContainer';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { stringifyNominalString } from '../utils/nominal-class';

export const RootView = () => {
  const [userInfos] = useRecoilState(state.userInfos);
  const [secteurs] = useRecoilState(state.secteurs);
  return (
    <MainContainer>
      {!userInfos && (
        <RouteLink
          route={{
            name: 'LoginRoute'
          }}
        >
          Se connecter
        </RouteLink>
      )}
      {userInfos && (
        <div>
          <RouteLink
            route={{
              name: 'ListOrganismesRoute'
            }}
          >
            Tous les organismes
          </RouteLink>
          <h3>Par secteur</h3>
          {secteurs.map(s => (
            <div>
              <RouteLink
                key={stringifyNominalString(s.id)}
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
      )}
    </MainContainer>
  );
};
