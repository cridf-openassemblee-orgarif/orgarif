/** @jsxImportSource @emotion/react */
import { MainContainer } from '../components/containers/MainContainer';
import { RouteLink } from '../components/routing/RouteLink';
import { ListOrganismesBySecteurRoute } from '../components/routing/routes';
import { colors } from '../components/styles/colors';
import { OrganismeListDto } from '../generated/domain/organisme';
import { ListOrganismesQueryResponse } from '../generated/query/queries';
import { appContext } from '../services/ApplicationContext';
import { state } from '../state/state';
import { getValue } from '../utils/nominal-class';
import { css } from '@emotion/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const ListOrganismesBySecteurView = ({
  route
}: {
  route: ListOrganismesBySecteurRoute;
}) => {
  const [organismes, setOrganismes] = useState<OrganismeListDto[]>();
  const secteurById = useRecoilValue(state.secteursById);
  const secteur = getValue(secteurById, route.secteurId);
  useEffect(() => {
    appContext
      .queryService()
      .send<ListOrganismesQueryResponse>({
        objectType: 'ListOrganismesQuery',
        departementIds: [],
        natureJuridiqueIds: [],
        secteurIds: [route.secteurId],
        typeStructureIds: [],
        page: 0,
        itemsNumber: 100,
        orderBy: 'nom'
      })
      .then(r => {
        setOrganismes(r.organismes);
      });
  }, [route.secteurId]);
  return (
    <MainContainer>
      <div
        css={css`
          padding-top: 70px;
          width: 80%;
          margin: auto;
        `}
      >
        <h1>{secteur.libelle}</h1>
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
