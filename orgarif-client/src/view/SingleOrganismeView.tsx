/** @jsxImportSource @emotion/react */
import { LeftPanel } from '../components/containers/LeftPanel';
import { MainContainer } from '../components/containers/MainContainer';
import { RightPanel } from '../components/containers/RightPanel';
import { EditOrganismeRoute } from '../components/routing/routes';
import { OrganismeDto } from '../generated/domain/organisme';
import { GetOrganismeQueryResponse } from '../generated/query/queries';
import { appContext } from '../services/ApplicationContext';
import { state } from '../state/state';
import { css } from '@emotion/react';
import { LinearProgress, Link, Slide, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export const SingleOrganismeView = (props: { route: EditOrganismeRoute }) => {
  const [organisme, setOrganisme] = React.useState<OrganismeDto>();
  const [error, setError] = React.useState(false);
  const isOpened = useRecoilValue(state.openedDrawer);
  const navigate = useNavigate();

  React.useEffect(() => {
    appContext
      .queryService()
      .send<GetOrganismeQueryResponse>({
        objectType: 'GetOrganismeQuery',
        id: props.route.id
      })
      .then(r => {
        setOrganisme(r.organisme);
      })
      .catch(e => {
        setError(true);
      });
  }, [props.route.id]);

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
