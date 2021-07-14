/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { OrganismeComponent } from '../component/OrganismeComponent';
import { MainContainer } from '../container/MainContainer';
import { FullOrganisme } from '../domain/organisme';
import { RouteLink } from '../routing/RouteLink';
import { EditOrganismeRoute } from '../routing/routes';

export const OrganismeView = (props: { routeParams: EditOrganismeRoute }) => {
  const [organisme, setOrganisme] =
    useState<FullOrganisme | undefined>(undefined);
  useEffect(() => {
    appContext
      .queryService()
      .getOrganismeQuery({ id: props.routeParams.id })
      .then(r => {
        setOrganisme(r.organisme);
      });
  }, [props.routeParams.id]);
  return (
    <MainContainer>
      <RouteLink route={{ name: 'ListOrganismesRoute' }}>list</RouteLink>
      {!organisme && <div>Chargement...</div>}
      {organisme && <OrganismeComponent organisme={organisme} />}
    </MainContainer>
  );
};
