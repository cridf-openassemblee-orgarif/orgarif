/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { EditOrganismeComponent } from '../component/EditOrganismeComponent';
import { MainContainer } from '../container/MainContainer';
import { FullOrganisme } from '../domain/organisme';
import { RouteLink } from '../routing/RouteLink';
import { EditOrganismeRoute } from '../routing/routes';

export const EditOrganismeView = (props: {
  routeParams: EditOrganismeRoute;
}) => {
  const [organisme, setOrganisme] = useState<FullOrganisme | undefined>(
    undefined
  );
  useEffect(() => {
    appContext
      .queryService()
      .getOrganismeQuery({ id: props.routeParams.id })
      .then((r) => {
        setOrganisme(r.organisme);
      });
  }, []);
  return (
    <MainContainer>
      <RouteLink route={{ name: 'ListOrganismesRoute' }}>list</RouteLink>
      {!organisme && <div>Chargement...</div>}
      {organisme && <EditOrganismeComponent organisme={organisme} />}
    </MainContainer>
  );
};
