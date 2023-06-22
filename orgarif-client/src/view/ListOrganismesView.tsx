/** @jsxImportSource @emotion/react */
import { MainContainer } from '../components/containers/MainContainer';
import { AddOrganismeComponent } from '../components/root/organisme/edit/AddOrganismeComponent';
import { RouteLink } from '../components/routing/RouteLink';
import { EditOrganismeRoute } from '../components/routing/routes';
import { OrganismeListDto } from '../generated/domain/Organisme';
import { ListAllOrganismesQueryResponse } from '../generated/query/Queries';
import { appContext } from '../services/ApplicationContext';
import { css } from '@emotion/react';
import * as React from 'react';
import { useEffect, useState } from 'react';

export const ListOrganismesView = (props: { route: EditOrganismeRoute }) => {
  const [organismes, setOrganismes] = useState<OrganismeListDto[]>([]);

  useEffect(() => {
    appContext.queryService
      .send<ListAllOrganismesQueryResponse>({
        objectType: 'ListAllOrganismesQuery'
      })
      .then(r => setOrganismes(r.organismes));
  }, [props.route.id]);

  return (
    <MainContainer>
      <div
        css={css`
          padding: 20px;
        `}
      >
        <div>
          <AddOrganismeComponent />
        </div>
        {organismes.map(o => (
          <div
            css={css`
              padding: 5px 0;
            `}
          >
            <RouteLink route={{ name: 'EditOrganismeRoute', id: o.id }}>
              {o.nom}
            </RouteLink>
          </div>
        ))}
      </div>
    </MainContainer>
  );
};
