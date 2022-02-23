/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { Chip, Divider, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { organismes } from '../data/organismes';
import { Edit } from '../icon/collection/Edit';
import { Share } from '../icon/collection/Share';
import { state } from '../state/state';
import { colors } from '../styles/colors';
import { Informations } from './Informations';
import { Representants } from './Representants';

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

// TODO: dynamization
export const LeftPanel = () => {
  const [isOpened, setIsOpened] = useRecoilState(state.openedDrawer);
  const representantsAg = organismes.representants.ag;
  const representantsCa = organismes.representants.ca;

  return (
    <Box
      css={css`
        background-color: ${colors.mainBackground};
        color: ${colors.grey};
        height: 99vh;
        padding: 2em 2em;
        overflow-y: auto;
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
          onClick={() => setIsOpened(!isOpened)}
        />
        <StyledChip
          label="ENVOYER LA FICHE"
          variant="outlined"
          icon={<Share size={20} />}
          size="small"
          onClick={() => console.log('envoyer la fiche...')}
        />
        <StyledChip
          variant="outlined"
          icon={<Edit size={20} />}
          size="small"
          onClick={() => console.log('éditer')}
          css={css`
            padding-right: 0 !important;
            padding-left: 0.8em !important;
          `}
        />
      </Stack>
      <Typography variant="h4" gutterBottom component="div">
        Mission locale (ML) intercommunale de La Courneuve - Le Bourget - Stains
        - Dugny
      </Typography>
      <Divider variant="fullWidth" />
      <Typography
        variant="h4"
        component="div"
        css={css`
          margin: 0.25em 0;
        `}
      >
        Informations
      </Typography>
      <Divider variant="fullWidth" />
      <Informations />
      <Divider variant="fullWidth" />
      <Typography
        variant="h4"
        component="div"
        css={css`
          margin: 0.25em 0;
        `}
      >
        AG - Représentants
      </Typography>
      <Divider variant="fullWidth" />
      <Representants reps={representantsAg} type="ag" />
      <Typography
        variant="h4"
        component="div"
        css={css`
          margin: -0.25em 0 0.25em;
        `}
      >
        CA - Représentants
      </Typography>
      <Divider variant="fullWidth" />
      <Representants reps={representantsCa} type="ca" />
    </Box>
  );
};
