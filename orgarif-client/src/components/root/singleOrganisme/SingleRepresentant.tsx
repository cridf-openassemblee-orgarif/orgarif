/** @jsxImportSource @emotion/react */
import { DesignationDto } from '../../../generated/domain/organisme';
import { Representant } from '../../../icon/collection/Representant';
import { breakpoints } from '../../styles/breakpoints';
import { colors } from '../../styles/colors';
import { css } from '@emotion/react';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';

export const SingleRepresentant = (props: {
  representation: DesignationDto | undefined;
  hasSuppleance: boolean;
  isTitulaire?: boolean;
}) => {
  const { representation, hasSuppleance, isTitulaire } = props;

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
          background-color: ${isTitulaire &&
          hasSuppleance &&
          window.innerWidth > 768
            ? colors.dark
            : 'transparent'};
        }
      `}
    >
      <Box
        css={css`
          display: flex;
          align-items: center;
          min-width: 300px;
          max-width: 300px;
          justify-content: flex-start;

          @media (${breakpoints.LAPTOP}) {
            justify-content: flex-start;
          }
        `}
      >
        {representation?.representant?.imageUrl ? (
          <Avatar
            alt={`${representation?.representant?.nom} ${representation?.representant?.prenom}`}
            src={representation?.representant?.imageUrl}
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
              padding: 0.3em 0 0 1.6em;
            `}
          >
            <Typography variant="body2">
              {`${representation?.representant?.prenom} 
                ${representation?.representant?.nom}`}
            </Typography>
            {/* TODO - information currently not available */}
            {/* <Typography variant="body2">{`DURÉE DU MANDAT : `}</Typography> */}
          </Stack>
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
