/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { OrganismeComponent } from '../component/OrganismeComponent';
import { MainContainer } from '../container/MainContainer';
import { OrganismeDto } from '../domain/organisme';
import { RouteLink } from '../routing/RouteLink';
import { EditOrganismeRoute, useRouteParams } from '../routing/routes';

export const OrganismeView = () => {
  const routeParams = useRouteParams<EditOrganismeRoute>();
  const [organisme, setOrganisme] = useState<OrganismeDto>();
  useEffect(() => {
    appContext
      .queryService()
      .getOrganismeQuery({ id: routeParams.id })
      .then(r => {
        setOrganisme(r.organisme);
      });
  }, [routeParams.id]);
  return (
    <MainContainer>
      <RouteLink route={{ name: 'ListOrganismesRoute' }}>list</RouteLink>
      {!organisme && <div>Chargement...</div>}
      {organisme && <OrganismeComponent organisme={organisme} />}
    </MainContainer>
  );
};
