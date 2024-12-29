/** @jsxImportSource @emotion/react */
import { OrganismeDto } from '../../generated/domain/Organisme.generated';
import { Edit } from '../../icon/collection/Edit';
import { Share } from '../../icon/collection/Share';
import { state } from '../../state/state';
import { Informations } from '../root/singleOrganisme/Informations';
import { Representants } from '../root/singleOrganisme/Representants';
import { RouteLink } from '../routing/RouteLink';
import { colors } from '../styles/colors';
import { EditOrganismeLink } from './OrganismesTable';
import { css } from '@emotion/react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import {
  Alert,
  Chip,
  Divider,
  Slide,
  Snackbar,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import Box from '@mui/material/Box';
import { TransitionProps } from '@mui/material/transitions';
import copy from 'copy-to-clipboard';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const OrganismesLink = (props: any) => (
  <RouteLink route={{ name: 'RootRoute' }} {...props} />
);

const classes = {
  chip: css`
    background: ${colors.white};

    &.MuiChip-outlined {
      border: none;
      padding: 0 0.5em;
      box-shadow: 0 0.5em 1em 0 rgba(191, 191, 191, 0.3);
      cursor: pointer;

      &:hover {
        background-color: ${colors.white};
        box-shadow: 0 0.5em 1em 0 rgba(191, 191, 191, 0.6);
        transition: all 0.3s ease-in-out;
      }
    }

    color: ${colors.dark};
  `
};
export const LeftPanel = (props: { organisme: OrganismeDto }) => {
  const userInfos = useRecoilValue(state.userInfos);
  const [openSnackbar, setOpenSnackbar] = useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Slide
  });

  const organisme = props.organisme;

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  const copyToClipboard = async () => {
    try {
      copy(window.location.href);
      setOpenSnackbar({ ...openSnackbar, open: true });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Box
      css={css`
        background-color: ${colors.mainBackground};
        color: ${colors.grey};
        padding: 1.5em 1em 2em;
        height: 100%;

        @media (min-width: 1170px) {
          height: 99vh;
          padding: 2em 2vw 3em;
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
        <Chip
          label="RETOUR"
          variant="outlined"
          icon={<ChevronLeftRoundedIcon />}
          size="small"
          component={OrganismesLink}
          css={classes.chip}
        />
        <Chip
          label="ENVOYER LA FICHE"
          variant="outlined"
          icon={<Share size={20} />}
          size="small"
          onClick={() => copyToClipboard()}
          css={classes.chip}
        />
        {userInfos && (
          <Tooltip title="Éditer la fiche de l'organisme" arrow>
            <Chip
              variant="outlined"
              icon={<Edit size={20} />}
              size="small"
              component={EditOrganismeLink}
              {...{ organismeId: organisme.id }}
              css={css`
                ${classes.chip};
                padding-right: 0 !important;
                padding-left: 0.8em !important;
              `}
            />
          </Tooltip>
        )}
        <Snackbar
          open={openSnackbar.open}
          autoHideDuration={5000}
          onClose={handleClose}
          TransitionComponent={openSnackbar.Transition}
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
            {organisme.nombreRepresentants > 0 && (
              <Divider variant="fullWidth" />
            )}
          </>
        )}

      {organisme.nombreRepresentants > 0 &&
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
            <Divider variant="fullWidth" />
          </React.Fragment>
        )}

      {organisme.instances.length === 0 && (
        <>
          <Typography
            variant="h4"
            component="div"
            css={css`
              font-size: clamp(1.5em, 2.4vw, 24px);
              margin: 0.5em 0 1.5em;
            `}
          >
            Aucune instance pour cet organisme
          </Typography>
        </>
      )}

      {organisme.instances.length > 0 &&
        organisme.instances.map((instance, idx) => {
          return (
            <React.Fragment key={instance.id}>
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
                      font-size: clamp(20px, 2.4vw, 24px);
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
