/** @jsxImportSource @emotion/react */
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { MainContainer } from '../container/MainContainer';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { asString } from '../utils/nominal-class';
import { css } from '@emotion/react';
import { FileDropZone } from '../component/base-component/FileDropZone';

export const RootView = () => {
  const [userInfos] = useRecoilState(state.userInfos);
  const [secteurs] = useRecoilState(state.secteurs);

  return (
    <MainContainer>
      <div
        css={css`
          width: 60%;
          margin: auto;
          background: white;
        `}
      >
        <FileDropZone />
      </div>
      {!userInfos && (
        <Box>
          <Typography
            variant="h1"
            component="h1"
            align="center"
            mt={4}
            sx={{
              fontSize: '22vw',
              lineHeight: '80%',
              userSelect: 'none'
            }}
          >
            ORGARIF
          </Typography>
        </Box>
      )}
      {userInfos && (
        <div
          css={css`
            margin: auto;
            width: 80%;
          `}
        >
          <h2>Liste des organismes</h2>
          <RouteLink
            route={{
              name: 'ListOrganismesRoute'
            }}
          >
            Tous les organismes
          </RouteLink>
          <div
            css={css`
              padding-left: 20px;
            `}
          >
            <h3>Par secteur</h3>
            {secteurs.map(s => (
              <div key={asString(s.id)}>
                <RouteLink
                  route={{
                    name: 'ListOrganismesBySecteurRoute',
                    secteurId: s.id
                  }}
                >
                  {s.libelle}
                </RouteLink>
              </div>
            ))}
          </div>
          <h2>Édition des catégories</h2>
          <RouteLink
            route={{
              name: 'EditDepartementsRoute'
            }}
          >
            Édition des départements
          </RouteLink>
          <br />
          <RouteLink
            route={{
              name: 'EditSecteursRoute'
            }}
          >
            Édition des secteurs
          </RouteLink>
          <br />
          <RouteLink
            route={{
              name: 'EditNatureJuridiquesRoute'
            }}
          >
            Édition des natures juridiques
          </RouteLink>
          <br />
          <RouteLink
            route={{
              name: 'EditTypeStructuresRoute'
            }}
          >
            Édition des types de structure
          </RouteLink>
        </div>
      )}
    </MainContainer>
  );
};
