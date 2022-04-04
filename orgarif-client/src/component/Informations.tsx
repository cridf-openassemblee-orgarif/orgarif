/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Chip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { OrganismeDto } from '../domain/organisme';
import { Departement } from '../icon/collection/Departement';
import { Localite } from '../icon/collection/Localite';
import { NatureJuridique } from '../icon/collection/NatureJuridique';
import { Secteur } from '../icon/collection/Secteur';
import { state } from '../state/state';
import { isMobile } from '../utils/viewport-utils';

// TODO : retrieve missing props localité
export const Informations = (props: { data: OrganismeDto }) => {
  const [departements] = useRecoilState(state.departements);
  const [secteurs] = useRecoilState(state.secteurs);
  const [natureJuridiques] = useRecoilState(state.natureJuridiques);

  const dept = departements.find(d => d.id === props.data.departementId);
  const sect = secteurs.find(s => s.id === props.data.secteurId);
  const nJ = natureJuridiques.find(n => n.id === props.data.natureJuridiqueId);

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
              ??
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4} lg={4}>
          <Item elevation={0}>
            <Departement size={isMobile() ? 90 : 110} />
            <Chip variant="outlined" label="DÉPARTEMENT" />
            <Typography variant="body2" mt={1}>
              {dept?.code}
            </Typography>
            <Typography variant="body2">{dept?.libelle}</Typography>
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4} lg={4}>
          <Item elevation={0}>
            <Secteur size={isMobile() ? 90 : 110} />
            <Chip variant="outlined" label="SECTEUR" />
            <Typography variant="body2" mt={1}>
              {sect?.libelle}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4} lg={4}>
          <Item elevation={0}>
            <NatureJuridique size={isMobile() ? 90 : 110} />
            <Chip variant="outlined" label="NATURE JURIDQIQUE" />
            <Typography variant="body2" mt={1}>
              {nJ?.libelle}
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

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
