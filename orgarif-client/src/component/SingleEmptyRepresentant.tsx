/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Chip, Paper, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';
import * as React from 'react';
import { colors } from '../styles/colors';

export const SingleEmptyRepresentant = (props: { hasSuppleance?: boolean }) => {
  return (
    <Item
      elevation={0}
      css={css`
        position: relative;

        &::after {
          content: '';
          position: absolute;
          height: 80%;
          width: 1px;
          right: -8px;
          background-color: ${props.hasSuppleance && window.innerWidth > 1024
            ? colors.dark
            : 'transparent'};
        }
      `}
    >
      <Box
        css={css`
          display: flex;
          align-items: center;
          min-width: 90%;
          justify-content: center;
        `}
      >
        <Avatar
          alt="Siège vaquant"
          css={css`
            width: 90px;
            height: 90px;
            margin-right: 1em;
            border: 2.5px dotted ${colors.dark};
            background-color: ${colors.mainBackground};
          `}
        />

        <Box
          css={css`
            padding: 0em 1.6em 0em 0em;
          `}
        >
          <StyledChip
            label={<Typography variant="body2">SIÈGE VAQUANT</Typography>}
            variant="outlined"
          />
        </Box>
      </Box>
    </Item>
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
  minHeight: '130px',
  padding: `${theme.spacing(2)} ${theme.spacing(0)}`
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(1)}`,
  borderRadius: '5em'
}));