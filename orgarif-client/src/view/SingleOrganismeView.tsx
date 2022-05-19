/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { LinearProgress, Link, Slide, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { appContext } from '../ApplicationContext';
import { LeftPanel } from '../container/LeftPanel';
import { MainContainer } from '../container/MainContainer';
import { RightPanel } from '../container/RightPanel';
import { OrganismeId } from '../domain/ids';
import { OrganismeDto } from '../domain/organisme';
import { state } from '../state/state';

export const SingleOrganismeView = () => {
  const [organisme, setOrganisme] = React.useState<OrganismeDto>();
  const [error, setError] = React.useState(false);
  const isOpened = useRecoilValue(state.openedDrawer);
  let location = useLocation();
  const navigate = useNavigate();

  // extract id from url
  const regex = RegExp('([^/]+[^/]|[^/]+[/])$', 'g');
  const id = regex.exec(location.pathname)![0] as unknown as OrganismeId;

  React.useEffect(() => {
    appContext
      .queryService()
      .getOrganismeQuery({ id })
      .then(r => {
        setOrganisme(r.organisme);
      })
      .catch(e => {
        setError(true);
      });
  }, [id]);

  return (
    <MainContainer>
      <Slide
        direction="left"
        in={true}
        timeout={isOpened ? 400 : 0}
        mountOnEnter
        unmountOnExit
      >
        <Box
          css={css`
            display: grid;
            grid-template-columns: 1fr;
            padding-top: 70px;

            @media (min-width: 1170px) {
              position: fixed;
              grid-template-columns: 51% 49%;
              width: 100%;
            }
          `}
        >
          {organisme && (
            <>
              <LeftPanel organisme={organisme} />
              <RightPanel organisme={organisme} />
            </>
          )}
        </Box>
      </Slide>
      {!organisme && !error && (
        <Box
          css={css`
            width: 100%;
          `}
        >
          <LinearProgress />
        </Box>
      )}
      {error && (
        <Box
          css={css`
            width: 100%;
            position: absolute;
            top: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-top: 2rem;
            padding: 0.2rem;
          `}
        >
          <Typography variant="body1">
            Une erreur est survenue - Impossible de récupérer les informations
            de l'organisme
          </Typography>
          <Link
            onClick={() => navigate('/organismes')}
            variant="body1"
            component="button"
            color="secondary"
          >
            Revenir à la liste des organismes
          </Link>
        </Box>
      )}
    </MainContainer>
  );
};
