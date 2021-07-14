/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ArrowBackIos } from '@material-ui/icons';
import * as React from 'react';
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
  const [organisme, setOrganisme] =
    useState<FullOrganisme | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    appContext
      .queryService()
      .getOrganismeQuery({ id: props.routeParams.id })
      .then(r => {
        setLoading(false);
        setOrganisme(r.organisme);
      });
  }, [props.routeParams.id]);
  return (
    <MainContainer>
      <RouteLink route={{ name: 'ListOrganismesRoute' }}>
        <span
          css={css`
            top: 6px;
          `}
        >
          <ArrowBackIos />
        </span>{' '}
        Retour liste des organismes
      </RouteLink>
      {loading && <div>Chargement...</div>}
      {organisme && (
        <EditOrganismeComponent organisme={organisme} setLoading={setLoading} />
      )}
    </MainContainer>
  );
};
