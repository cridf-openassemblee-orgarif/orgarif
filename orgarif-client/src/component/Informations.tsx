/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Chip, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import * as React from 'react';
import { organismes } from '../data/organismes';
import { Departement } from '../icon/collection/Departement';
import { Localite } from '../icon/collection/Localite';
import { Mail } from '../icon/collection/Mail';
import { NatureJuridique } from '../icon/collection/NatureJuridique';
import { Secteur } from '../icon/collection/Secteur';
import { SiteWeb } from '../icon/collection/SiteWeb';
import { TextJuridique } from '../icon/collection/TextJuridique';
import { isMobile } from '../utils/viewport-utils';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.secondary.main,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

// TODO: dynamization
export const Informations = () => {
  return (
    <Box
      css={css`
        flex-grow: 1;
        padding-top: 0.5em;
        padding-bottom: 1em;
      `}
    >
      <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
        <Grid item xs={2} sm={4} md={4} lg={4}>
          <Item elevation={0}>
            <Localite size={isMobile() ? 90 : 110} />
            <Chip variant="outlined" label="LOCALITÉ" />
            <Typography variant="body2" mt={1}>
              {organismes.nom}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4} lg={4}>
          <Item elevation={0}>
            <Departement size={isMobile() ? 90 : 110} />
            <Chip variant="outlined" label="DÉPARTEMENT" />
            <Typography variant="body2" mt={1}>
              {organismes.departement.code}
            </Typography>
            <Typography variant="body2">
              {organismes.departement.nom}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4} lg={4}>
          <Item elevation={0}>
            <Secteur size={isMobile() ? 90 : 110} />
            <Chip variant="outlined" label="SECTEUR" />
            <Typography variant="body2" mt={1}>
              {organismes.secteur}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4} lg={4}>
          <Item elevation={0}>
            <NatureJuridique size={isMobile() ? 90 : 110} />
            <Chip variant="outlined" label="NATURE JURIDQIQUE" />
            <Typography variant="body2" mt={1}>
              {organismes.natureJuridique}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4} lg={4}>
          <Item elevation={0}>
            <SiteWeb size={isMobile() ? 90 : 110} />
            <Chip variant="outlined" label="SITE WEB" />
            <Link
              href={organismes.siteWeb}
              color="inherit"
              variant="body2"
              mt={1}
            >
              {organismes.siteWeb}
            </Link>
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4} lg={4}>
          <Item elevation={0}>
            <Mail size={isMobile() ? 90 : 110} />
            <Chip variant="outlined" label="CONTACT MAIL" />
            <Typography variant="body2" mt={1}>
              {organismes.contact}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4} lg={4}>
          <Item elevation={0}>
            <TextJuridique size={isMobile() ? 90 : 110} />
            <Chip variant="outlined" label="TEXTE JURIDIQUE" />
            <Link
              href={organismes.texteJuridique}
              color="inherit"
              variant="body2"
              mt={1}
            >
              Télécharger
            </Link>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};
