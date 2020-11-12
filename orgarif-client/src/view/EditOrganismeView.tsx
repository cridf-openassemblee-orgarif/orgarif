/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { EditOrganismeComponent } from '../component/edit/EditOrganismeComponent';
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    appContext
      .queryService()
      .getOrganismeQuery({ id: props.routeParams.id })
      .then((r) => {
        setLoading(false);
        setOrganisme(r.organisme);
      });
  }, []);
  return (
    <MainContainer>
      <RouteLink route={{ name: 'ListOrganismesRoute' }}>list</RouteLink>
      {loading && <div>Chargement...</div>}
      {organisme && (
        <EditOrganismeComponent organisme={organisme} setLoading={setLoading} />
      )}
    </MainContainer>
  );
};
