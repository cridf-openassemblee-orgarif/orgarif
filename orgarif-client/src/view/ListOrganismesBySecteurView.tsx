/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { OrganismeListDto } from '../domain/organisme';
import { RouteLink } from '../routing/RouteLink';
import { ListOrganismesBySecteurRoute } from '../routing/routes';
import { state } from '../state/state';
import { colors } from '../styles/colors';
import { asString, getValue } from '../utils/nominal-class';

export const ListOrganismesBySecteurView = (props: {
  routeParams: ListOrganismesBySecteurRoute;
}) => {
  const [organismes, setOrganismes] = useState<OrganismeListDto[]>();
  const secteurById = useRecoilValue(state.secteursById);
  const secteur = getValue(secteurById, props.routeParams.secteurId);
  useEffect(() => {
    appContext
      .queryService()
      .listOrganismesBySecteurQuery({
        secteurId: props.routeParams.secteurId
      })
      .then(r => {
        setOrganismes(r.organismes);
      });
  }, [props.routeParams.secteurId]);
  return (
    <MainContainer>
      <h1>{secteur.libelle}</h1>
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
    </MainContainer>
  );
};
