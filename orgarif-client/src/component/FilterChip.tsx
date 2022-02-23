/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Chip } from '@mui/material';
import * as React from 'react';
import { Organigram } from '../icon/collection/Organigram';
import * as breakpoints from '../styles/breakpoints';
import { colors } from '../styles/colors';

const StyledChip = styled(Chip)(({ theme }) => ({
  lineHeight: 1,
  fontWeight: 500,
  borderRadius: '40px',
  height: 'fit-content',
  margin: '9px',
  padding: '8px',
  fontSize: 'clamp(18px, 1.1vw, 2rem)',
  transition: 'font-size 0.4s ease-in-out',
  boxShadow: '0px 5px 10px 0px rgba(191, 191, 191, 0.4)',
  '&.MuiChip-colorPrimary': {
    backgroundColor: `${colors.white}`,
    '&:hover': {
      backgroundColor: `${colors.errorRed}`,
      color: `${colors.white}`,
      transition: 'all .3s ease-in-out'
    },
    color: `${colors.dark}`
  },
  '& .MuiChip-outlinedPrimary': {},
  '& .MuiChip-label': {
    padding: '0.2vw 0.8vw',
    textTransform: 'uppercase'
  },
  '& .MuiChip-icon': {
    order: 1,
    marginRight: '0.8vw'
  }
}));

const skrinkedChips = css`
  padding: clamp(5px, 0.1vw, 20px);
  font-size: clamp(14px, 0.7vw, 2rem);
  transition: padding 1s ease-in-out, font-size 1s ease-in-out;

  @media screen and (${breakpoints.MOBILE_S}) {
    max-width: 80vw;
  }
`;

/**
 * TODO : typing props + handle filters when selected
 */
export const FilterChip = ({ filter, showIcon, isSticky }: any) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(filter);
    console.log(e.target);
  };

  return (
    <>
      {showIcon ? (
        <StyledChip
          key={filter.libelle}
          color="primary"
          icon={
            <Organigram size={isSticky ? '24px' : 'clamp(24px, 1.4vw, 2rem)'} />
          }
          label={filter.libelle}
          onClick={handleClick}
          css={isSticky ? skrinkedChips : ''}
        />
      ) : (
        <StyledChip
          key={filter.libelle}
          color="primary"
          label={
            !filter.code
              ? `${filter.libelle}`
              : `${filter.libelle} - ${filter.code}`
          }
          onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
          css={isSticky ? skrinkedChips : ''}
        />
      )}
    </>
  );
};
