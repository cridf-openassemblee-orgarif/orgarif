/** @jsxImportSource @emotion/react */
import { MainContainer } from '../../components/containers/MainContainer';
import { RouteLink } from '../../components/routing/RouteLink';
import { RepresentantDetailsRoute } from '../../components/routing/routes';
import { colors } from '../../components/styles/colors';
import {
  OrganismeListDto,
  RepresentantDto
} from '../../generated/domain/Organisme.generated';
import { GetRepresentantDetailsQueryResponse } from '../../generated/query/Queries.generated';
import { appContext } from '../../services/ApplicationContext';
import { css } from '@emotion/react';
import { ArrowBackIos } from '@mui/icons-material';
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
        <div>
          <RouteLink
            route={{ name: 'RepresentantsRoute' }}
            addCss={css`
              display: flex;
              direction: row;
            `}
          >
            <ArrowBackIos
              css={css`
                padding-right: 4px;
              `}
            />
            Liste des représentants
          </RouteLink>
        </div>
        {representant && (
          <>
            <h1>
              {representant.civilite} {representant.prenom} {representant.nom}
            </h1>
            {representant.eluId && (
              <div>Élu {representant.groupePolitique}</div>
            )}
            {organismes.length === 0 && <div>Sans organisme</div>}
            {organismes.length > 0 && (
              <>
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
          </>
        )}
      </div>
    </MainContainer>
  );
};
