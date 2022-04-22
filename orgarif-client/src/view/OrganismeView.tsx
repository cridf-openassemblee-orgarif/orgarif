/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { OrganismeComponent } from '../component/OrganismeComponent';
import { MainContainer } from '../container/MainContainer';
import { OrganismeDto } from '../domain/organisme';
import { RouteLink } from '../routing/RouteLink';
import { EditOrganismeRoute } from '../routing/routes';

export const OrganismeView = ({ route }: { route: EditOrganismeRoute }) => {
  const [organisme, setOrganisme] = useState<OrganismeDto>();
  useEffect(() => {
    appContext
      .queryService()
      .getOrganismeQuery({ id: route.id })
      .then(r => {
        setOrganisme(r.organisme);
      });
  }, [route.id]);
  return (
    <MainContainer>
      <RouteLink route={{ name: 'EditListOrganismesRoute' }}>list</RouteLink>
      {!organisme && <div>Chargement...</div>}
      {organisme && <OrganismeComponent organisme={organisme} />}
    </MainContainer>
  );
};
