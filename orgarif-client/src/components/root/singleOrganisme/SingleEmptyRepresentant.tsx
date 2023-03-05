/** @jsxImportSource @emotion/react */
import { breakpoints } from '../../styles/breakpoints';
import { colors } from '../../styles/colors';
import { css } from '@emotion/react';
import { Chip, Paper, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';

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
          background-color: ${props.hasSuppleance && window.innerWidth > 768
            ? colors.dark
            : 'transparent'};
        }
      `}
    >
      <Box
        css={css`
          display: flex;
          align-items: center;
          min-width: 285px;
          justify-content: flex-start;

          @media (${breakpoints.LAPTOP}) {
            justify-content: center;
          }
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
            padding: 0.3em 0;
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
  [theme.breakpoints.up(1024)]: {
    minHeight: '130px',
    padding: `${theme.spacing(2)} ${theme.spacing(0)}`
  }
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(1)}`,
  borderRadius: '5em'
}));
