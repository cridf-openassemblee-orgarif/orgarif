/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import * as React from 'react';
import { Representant } from '../icon/collection/Representant';

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

// TODO: dynamization
export const SingleRepresentant = ({
  representant,
  type,
  suppleant = false
}: any) => {
  return (
    <Grid item xs md={type === 'ag' ? 6 : 12}>
      <Item elevation={0}>
        <Box
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {representant.photo ? (
            <Avatar
              alt={`${representant.nom} ${representant.prenom}`}
              src={representant.photo}
              css={css`
                width: 90;
                height: 90;
                margin-right: 1em;
              `}
            />
          ) : (
            <Representant size={80} />
          )}
          <Box>
            <StyledChip
              label={
                !suppleant ? (
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
              sx={{
                padding: '.3em 1.6em'
              }}
            >
              <Typography variant="body2">{`${representant.prenom} ${representant.nom}`}</Typography>
              <Typography variant="body2">
                {`DURÉE DU MANDAT : ${representant.dureeMandat} ans`}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Item>
    </Grid>
  );
};
