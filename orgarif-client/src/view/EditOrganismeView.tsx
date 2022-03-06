/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ArrowBackIos } from '@mui/icons-material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { EditOrganismeComponent } from '../component/organisme/edit/EditOrganismeComponent';
import { MainContainer } from '../container/MainContainer';
import { OrganismeDto } from '../domain/organisme';
import { LoadingState } from '../interfaces';
import { RouteLink } from '../routing/RouteLink';
import { EditOrganismeRoute } from '../routing/routes';
import { assertUnreachable } from '../utils';

const displayLoading = (loading: LoadingState) => {
  switch (loading) {
    case 'loading':
      return <div>Chargement...</div>;
    case 'idle':
      return null;
    case 'error':
      return <div>Erreur de chargement</div>;
    default:
      assertUnreachable(loading);
  }
};

export const EditOrganismeView = (props: {
  routeParams: EditOrganismeRoute;
}) => {
  const [organisme, setOrganisme] = useState<OrganismeDto | undefined>();
  const [loading, setLoading] = useState<LoadingState>('idle');
  useEffect(() => {
    setOrganisme(undefined);
    setLoading('loading');
    const exec = async () => {
      const organisme = await appContext
        .queryService()
        .getOrganismeQuery({ id: props.routeParams.id })
        .then(r => r.organisme)
        .catch(() => setLoading('error'));
      if (!organisme) {
        return;
      }
      setLoading('idle');
      // const representationsMap = doRepresentationsMap(organisme);
      // const organismeSuppleances = doOrganismeSuppleances(organisme);
      setOrganisme(organisme);
    };
    exec();
  }, [props.routeParams.id]);
  return (
    <MainContainer>
      <RouteLink route={{ name: 'ListOrganismesRoute' }}>
        <span
          css={css`
            top: 6px;
            font-size: 10px;
          `}
        >
          <ArrowBackIos fontSize="small" />
        </span>{' '}
        Retour liste des organismes
      </RouteLink>
      {displayLoading(loading)}
      {organisme && (
        <EditOrganismeComponent
          organisme={organisme}
          setOrganisme={setOrganisme}
        />
      )}
    </MainContainer>
  );
};
