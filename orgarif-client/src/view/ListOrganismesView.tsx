/** @jsxImportSource @emotion/react */
import { MainContainer } from '../components/containers/MainContainer';
import { AddOrganismeComponent } from '../components/root/organisme/edit/AddOrganismeComponent';
import { RouteLink } from '../components/routing/RouteLink';
import { colors } from '../components/styles/colors';
import { OrganismeListDto } from '../generated/domain/organisme';
import { ListOrganismesQueryResponse } from '../generated/query/queries';
import { appContext } from '../services/ApplicationContext';
import { css } from '@emotion/react';
import * as React from 'react';
import { useEffect, useState } from 'react';

export const ListOrganismesView = () => {
  const [organismes, setOrganismes] = useState<OrganismeListDto[]>();
  useEffect(() => {
    appContext
      .queryService()
      .send<ListOrganismesQueryResponse>({
        objectType: 'ListOrganismesQuery',
        departementIds: [],
        natureJuridiqueIds: [],
        secteurIds: [],
        typeStructureIds: [],
        page: 0,
        itemsNumber: 100,
        orderBy: 'nom'
      })
      .then(r => {
        setOrganismes(r.organismes);
      });
  }, []);
  return (
    <MainContainer>
      <div
        css={css`
          width: 80%;
          margin: auto;
          padding-top: 70px;
        `}
      >
        <h1>Liste des organismes</h1>
        <AddOrganismeComponent />
        {!organismes && <div>Chargement...</div>}
        {organismes &&
          organismes.map(o => (
            <div
              key={o.id}
              css={css`
                background: ${colors.clearGrey};
                margin: 2px 0;
                padding: 4px;
              `}
            >
              <h2>{o.nom}</h2>
              {/*<RouteLink route={{ name: 'OrganismeRoute', id: o.id }}>*/}
              {/*  view*/}
              {/*</RouteLink>*/}
              {/*<br />*/}
              <RouteLink route={{ name: 'EditOrganismeRoute', id: o.id }}>
                Éditer
              </RouteLink>
            </div>
          ))}
      </div>
    </MainContainer>
  );
};
