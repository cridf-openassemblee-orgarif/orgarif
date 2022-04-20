/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import {
  Alert,
  Chip,
  Divider,
  Snackbar,
  Stack,
  Typography
} from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { OrganismeDto } from '../domain/organisme';
import { Edit } from '../icon/collection/Edit';
import { Share } from '../icon/collection/Share';
import { state } from '../state/state';
import * as breakpoint from '../styles/breakpoints';
import { colors } from '../styles/colors';
import { asString } from '../utils/nominal-class';
import { Informations } from './Informations';
import { Representants } from './Representants';

// TODO: edition link + should button be always visible ?
export const LeftPanel = (props: { organisme: OrganismeDto }) => {
  const [isOpened, setIsOpened] = useRecoilState(state.openedDrawer);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const navigate = useNavigate();
  const organisme = props.organisme;

  const handleBackButtonClick = () => {
    navigate('/');
    setIsOpened(!isOpened);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // TODO - consider installing copy-to-clipboard package instead if need to add support for IE
  const copyToClipboard = async () => {
    // Note: Clipboard feature is available only in secure contexts (HTTPS)
    try {
      await navigator.clipboard.writeText(window.location.href);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Box
      css={css`
        background-color: ${colors.mainBackground};
        color: ${colors.grey};
        padding: 2em 1em;

        @media (${breakpoint.LAPTOP}) {
          height: 99vh;
          padding: 2em 2vw;
          overflow-y: auto;
        }
      `}
    >
      <Stack
        direction="row"
        spacing={2}
        css={css`
          margin-bottom: 1em;
        `}
      >
        <StyledChip
          label="RETOUR"
          variant="outlined"
          icon={<ChevronLeftRoundedIcon />}
          size="small"
          onClick={handleBackButtonClick}
        />
        <StyledChip
          label="ENVOYER LA FICHE"
          variant="outlined"
          icon={<Share size={20} />}
          size="small"
          onClick={() => {
            copyToClipboard();
          }}
        />
        <StyledChip
          variant="outlined"
          icon={<Edit size={20} />}
          size="small"
          onClick={() => console.log('renvoyer vers edition organisme ...')}
          css={css`
            padding-right: 0 !important;
            padding-left: 0.8em !important;
          `}
        />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <Alert
            severity="info"
            variant="filled"
            elevation={6}
            onClose={handleClose}
          >
            Le lien de cet organisme a été copié dans votre presse-papier
          </Alert>
        </Snackbar>
      </Stack>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        css={css`
          font-size: clamp(1.5em, 2.4vw, 36px);
        `}
      >
        {organisme.nom}
      </Typography>
      <Divider variant="fullWidth" />
      <Typography
        variant="h4"
        component="div"
        css={css`
          font-size: clamp(1.5em, 2.4vw, 36px);
          margin: 0.25em 0;
        `}
      >
        Informations
      </Typography>
      <Divider variant="fullWidth" />
      <Informations data={organisme} />
      <Divider variant="fullWidth" />

      {organisme.designationRepresentants.length === 0 &&
        organisme.designationSuppleants.length === 0 &&
        organisme.nombreRepresentants === 0 && (
          <>
            <Typography
              variant="h4"
              component="div"
              css={css`
                font-size: clamp(1.5em, 2.4vw, 24px);
                margin: 0.5em 0;
              `}
            >
              Aucun représentant pour cet organisme
            </Typography>
            <Divider variant="fullWidth" />
          </>
        )}

      {organisme.nombreRepresentants &&
        organisme.designationRepresentants.length > 0 && (
          <React.Fragment>
            <Typography
              variant="h4"
              component="div"
              css={css`
                font-size: clamp(1.5em, 2.4vw, 36px);
                margin: 0.25em 0;
              `}
            >
              Représentants
            </Typography>
            <Divider variant="fullWidth" />
            <Representants
              reps={organisme.designationRepresentants.map(r => r ?? undefined)}
              supps={organisme.designationSuppleants.map(r => r ?? undefined)}
              hasSuppleance={organisme.presenceSuppleants}
            />
          </React.Fragment>
        )}

      {organisme.instances.length === 0 && (
        <>
          <Typography
            variant="h4"
            component="div"
            css={css`
              font-size: clamp(1.5em, 2.4vw, 24px);
              margin: 0.5em 0;
            `}
          >
            Aucune instance pour cet organisme
          </Typography>
          <Divider variant="fullWidth" />
        </>
      )}

      {organisme.instances.length > 0 &&
        organisme.instances.map((instance, idx) => {
          return (
            <React.Fragment key={asString(instance.id)}>
              <Divider variant="fullWidth" />
              <Typography
                variant="h4"
                component="div"
                css={css`
                  font-size: clamp(1.5em, 2.4vw, 36px);
                  margin: 0.25em 0;
                `}
              >
                {instance.nom} - Représentants
              </Typography>
              <Divider variant="fullWidth" />

              {instance.designationRepresentants.length === 0 &&
              instance.designationSuppleants.length === 0 ? (
                <>
                  <Typography
                    variant="h4"
                    component="div"
                    css={css`
                      font-size: clamp(1.5em, 2.4vw, 24px);
                      margin: 0.5em 0 1.5em;
                    `}
                  >
                    Aucun représentant pour cette instance
                  </Typography>
                  <Divider variant="fullWidth" />
                </>
              ) : (
                <Representants
                  reps={instance.designationRepresentants.map(
                    r => r ?? undefined
                  )}
                  supps={instance.designationSuppleants.map(
                    r => r ?? undefined
                  )}
                  hasSuppleance={instance.presenceSuppleants}
                />
              )}
            </React.Fragment>
          );
        })}
    </Box>
  );
};

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: colors.white,
  '&.MuiChip-outlined': {
    border: 'none',
    padding: '0 0.5em',
    boxShadow: '0px .5em 1em 0px rgba(191, 191, 191, 0.3)',
    '&:hover': {
      backgroundColor: colors.white,
      boxShadow: '0px .5em 1em 0px rgba(191, 191, 191, 0.6)',
      transition: 'all .3s ease-in-out'
    }
  },
  color: colors.dark
}));
