/** @jsxImportSource @emotion/react */
import { MainContainer } from '../../components/containers/MainContainer';
import { RouteLink } from '../../components/routing/RouteLink';
import { colors } from '../../components/styles/colors';
import { RepresentantDto } from '../../generated/domain/Organisme';
import { GetRepresentantsQueryResponse } from '../../generated/query/Queries';
import { appContext } from '../../services/ApplicationContext';
import { css } from '@emotion/react';
import * as React from 'react';
import { useEffect, useState } from 'react';

export const RepresentantsView = () => {
  const [representants, setRepresentants] = useState<RepresentantDto[]>([]);
  useEffect(() => {
    appContext.queryService
      .send<GetRepresentantsQueryResponse>({
        objectType: 'GetRepresentantsQuery'
      })
      .then(r => {
        setRepresentants(r.representants);
      });
  }, []);
  return (
    <MainContainer>
      <div
        css={css`
          margin: 20px;
        `}
      >
        <h1>Representants</h1>
        {representants.map(r => (
          <div
            key={r.id}
            css={css`
              margin: 4px;
            `}
          >
            <RouteLink
              route={{
                name: 'RepresentantDetailsRoute',
                id: r.id
              }}
            >
              {r.civilite} {r.prenom} {r.nom}
              {r.eluId && (
                <div
                  css={css`
                    padding-left: 20px;
                    font-size: 0.8rem;
                  `}
                >
                  Élu {r.groupePolitique}
                </div>
              )}
            </RouteLink>
            <hr
              css={css`
                border: 0;
                border-bottom: 1px solid ${colors.grey2};
              `}
            />
          </div>
        ))}
      </div>
    </MainContainer>
  );
};
