/** @jsxImportSource @emotion/react */
import { MainContainer } from '../../components/containers/MainContainer';
import { RouteLink } from '../../components/routing/RouteLink';
import { colors } from '../../components/styles/colors';
import { RepresentantDto } from '../../generated/domain/Organisme.generated';
import { GetRepresentantsQueryResponse } from '../../generated/query/Queries.generated';
import { appContext } from '../../services/ApplicationContext';
import { assertUnreachable } from '../../utils';
import { css } from '@emotion/react';
import * as React from 'react';
import { useEffect, useState } from 'react';

export const RepresentantsView = () => {
  const [representants, setRepresentants] = useState<RepresentantDto[]>([]);
  const [filter, setFilter] = useState<'tous' | 'elus' | 'non-elus'>('tous');
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
        <h1>Représentants</h1>
        <div
          css={css`
            margin: 20px;
            span {
              cursor: pointer;
              padding: 10px 20px;
            }
          `}
        >
          <span
            onClick={() => setFilter('tous')}
            css={css`
              font-weight: ${filter === 'tous' ? 'bold' : 'normal'};
            `}
          >
            Tous
          </span>
          <span
            onClick={() => setFilter('elus')}
            css={css`
              font-weight: ${filter === 'elus' ? 'bold' : 'normal'};
            `}
          >
            Élus uniquement
          </span>
          <span
            onClick={() => setFilter('non-elus')}
            css={css`
              font-weight: ${filter === 'non-elus' ? 'bold' : 'normal'};
            `}
          >
            Non élus uniquement
          </span>
        </div>
        <div>
          {representants
            .filter(r => {
              switch (filter) {
                case 'tous':
                  return true;
                case 'elus':
                  return !!r.eluId;
                case 'non-elus':
                  return !r.eluId;
                default:
                  return assertUnreachable(filter);
              }
            })
            .map(r => (
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
                  addCss={css`
                    &:hover {
                      text-decoration: underline !important;
                    }
                  `}
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
      </div>
    </MainContainer>
  );
};
