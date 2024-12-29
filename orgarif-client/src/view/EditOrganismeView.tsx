/** @jsxImportSource @emotion/react */
import { MainContainer } from '../components/containers/MainContainer';
import { EditOrganismeComponent } from '../components/root/organisme/edit/EditOrganismeComponent';
import { RouteLink } from '../components/routing/RouteLink';
import { EditOrganismeRoute } from '../components/routing/routes';
import { OrganismeDto } from '../generated/domain/Organisme.generated';
import { GetOrganismeQueryResponse } from '../generated/query/Queries.generated';
import { LoadingState } from '../interfaces';
import { appContext } from '../services/ApplicationContext';
import { assertUnreachable } from '../utils';
import { css } from '@emotion/react';
import { ArrowBackIos } from '@mui/icons-material';
import * as React from 'react';
import { useEffect, useState } from 'react';

const displayLoading = (loading: LoadingState) => {
  switch (loading) {
    case 'Loading':
      return <div>Chargement...</div>;
    case 'Idle':
      return null;
    case 'Error':
      return <div>Erreur de chargement</div>;
    default:
      assertUnreachable(loading);
  }
};

export const EditOrganismeView = ({ route }: { route: EditOrganismeRoute }) => {
  const [organisme, setOrganisme] = useState<OrganismeDto>();
  const [loading, setLoading] = useState<LoadingState>('Idle');
  useEffect(() => {
    setOrganisme(undefined);
    setLoading('Loading');
    const exec = async () => {
      const organisme = await appContext.queryService
        .send<GetOrganismeQueryResponse>({
          objectType: 'GetOrganismeQuery',
          id: route.id
        })
        .then(r => r.organisme);
      if (!organisme) {
        return;
      }
      setLoading('Idle');
      setOrganisme(organisme);
    };
    exec();
  }, [route.id]);
  return (
    <MainContainer>
      <div
        css={css`
          width: 80%;
          margin: auto;
        `}
      >
        <RouteLink route={{ name: 'OrganismeRoute', id: route.id }}>
          <span
            css={css`
              position: relative;
              top: 4px;
              font-size: 10px;
              margin-right: 10px;
            `}
          >
            <ArrowBackIos fontSize="small" />
          </span>
          Retour organisme
        </RouteLink>
        {displayLoading(loading)}
        {organisme && (
          <EditOrganismeComponent
            organisme={organisme}
            setOrganisme={setOrganisme}
          />
        )}
      </div>
    </MainContainer>
  );
};
