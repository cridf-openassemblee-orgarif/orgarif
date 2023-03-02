/** @jsxImportSource @emotion/react */
import { MainContainer } from '../components/containers/MainContainer';
import { OrganismeComponent } from '../components/root/OrganismeComponent';
import { RouteLink } from '../components/routing/RouteLink';
import { EditOrganismeRoute } from '../components/routing/routes';
import { OrganismeDto } from '../generated/domain/organisme';
import { GetOrganismeQueryResponse } from '../generated/query/queries';
import { appContext } from '../services/ApplicationContext';
import * as React from 'react';
import { useEffect, useState } from 'react';

export const OrganismeView = ({ route }: { route: EditOrganismeRoute }) => {
  const [organisme, setOrganisme] = useState<OrganismeDto>();
  useEffect(() => {
    appContext
      .queryService()
      .send<GetOrganismeQueryResponse>({
        objectType: 'GetOrganismeQuery',
        id: route.id
      })
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
