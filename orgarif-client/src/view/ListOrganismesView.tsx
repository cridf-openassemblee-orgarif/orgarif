/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { OrganismeListDto } from '../domain/organisme';
import { RouteLink } from '../routing/RouteLink';
import { colors } from '../styles/colors';
import { asString } from '../utils/nominal-class';
import { AddOrganismeComponent } from '../component/organisme/edit/AddOrganismeComponent';

export const ListOrganismesView = () => {
  const [organismes, setOrganismes] = useState<OrganismeListDto[]>();
  useEffect(() => {
    appContext
      .queryService()
      .listOrganismesQuery({
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
        `}
      >
        <h1>Liste des organismes</h1>
        <AddOrganismeComponent />
        {!organismes && <div>Chargement...</div>}
        {organismes &&
          organismes.map(o => (
            <div
              key={asString(o.id)}
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
