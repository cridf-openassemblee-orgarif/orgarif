/** @jsxImportSource @emotion/react */
import { MainContainer } from '../../components/containers/MainContainer';
import { RouteLink } from '../../components/routing/RouteLink';
import { RepresentantDetailsRoute } from '../../components/routing/routes';
import { colors } from '../../components/styles/colors';
import {
  OrganismeListDto,
  RepresentantDto
} from '../../generated/domain/Organisme';
import { GetRepresentantDetailsQueryResponse } from '../../generated/query/Queries';
import { appContext } from '../../services/ApplicationContext';
import { css } from '@emotion/react';
import * as React from 'react';
import { useEffect, useState } from 'react';

export const RepresentantDetailsView = (props: {
  route: RepresentantDetailsRoute;
}) => {
  const [representant, setRepresentant] = useState<RepresentantDto>();
  const [organismes, setOrganismes] = useState<OrganismeListDto[]>([]);
  useEffect(() => {
    appContext.queryService
      .send<GetRepresentantDetailsQueryResponse>({
        objectType: 'GetRepresentantDetailsQuery',
        id: props.route.id
      })
      .then(r => {
        setRepresentant(r.representant);
        setOrganismes(r.organismes);
      });
  }, [props.route.id]);
  return (
    <MainContainer>
      <div
        css={css`
          margin: 20px;
        `}
      >
        {representant && (
          <>
            <h1>
              {representant.civilite} {representant.prenom} {representant.nom}
            </h1>
            {representant.id && <div>{representant.groupePolitique}</div>}
            <h2>Organismes</h2>
            {organismes.map(o => (
              <div
                key={o.id}
                css={css`
                  margin: 4px;
                `}
              >
                <RouteLink
                  route={{
                    name: 'EditOrganismeRoute',
                    id: o.id
                  }}
                  addCss={css`
                    &:hover {
                      text-decoration: underline !important;
                    }
                  `}
                >
                  {o.nom}
                </RouteLink>
                <hr
                  css={css`
                    border: 0;
                    border-bottom: 1px solid ${colors.grey2};
                  `}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </MainContainer>
  );
};
