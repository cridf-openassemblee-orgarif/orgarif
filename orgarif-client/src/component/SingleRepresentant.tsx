/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import * as React from 'react';
import { RepresentationDto } from '../domain/organisme';
import { Representant } from '../icon/collection/Representant';

export const SingleRepresentant = (props: {
  representation: RepresentationDto;
  hasSuppleance: boolean;
  isTitulaire?: boolean;
}) => {
  const { representation, hasSuppleance, isTitulaire } = props;

  return (
    <Grid item xs md={hasSuppleance ? 6 : 12}>
      <Item elevation={0}>
        <Box
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {representation.representant.imageUrl ? (
            <Avatar
              alt={`${representation.representant.nom} ${representation.representant.prenom}`}
              src={representation.representant.imageUrl}
              css={css`
                width: 90px;
                height: 90px;
                margin-right: 1em;
              `}
            />
          ) : (
            <Representant size={80} />
          )}
          <Box>
            <StyledChip
              label={
                isTitulaire ? (
                  <>
                    <Typography variant="body2">TITULAIRE</Typography>
                    <Typography variant="body2">(DÉLIBÉRATION)</Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="body2">SUPPLÉANT</Typography>
                    <Typography variant="body2">(DÉLIBÉRATION)</Typography>
                  </>
                )
              }
              variant="outlined"
            />
            <Stack
              css={css`
                padding: 0.3em 1.6em;
              `}
            >
              <Typography variant="body2">
                {`${representation.representant.prenom} 
                ${representation.representant.nom}`}
              </Typography>
              <Typography variant="body2">{`DURÉE DU MANDAT : `}</Typography>
            </Stack>
          </Box>
        </Box>
      </Item>
    </Grid>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  ...theme.typography.body2,
  margin: theme.spacing(1),
  color: theme.palette.secondary.main,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `${theme.spacing(2)} ${theme.spacing(0)}`
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(1)}`,
  borderRadius: '5em'
}));
