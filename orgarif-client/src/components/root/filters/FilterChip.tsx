/** @jsxImportSource @emotion/react */
import { Category, CategoryId } from '../../../domain/category';
import { breakpoints } from '../../styles/breakpoints';
import { colors } from '../../styles/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Chip } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';

export const FilterChip = (props: {
  filter: Category;
  label: string;
  tooltipLabel?: string;
  sticky: boolean | undefined;
  active: boolean;
  onClick: (id: CategoryId) => void;
}) => {
  const chipColor = props.active ? 'error' : 'primary';
  const chip = (
    <StyledChip
      key={props.filter.id}
      color={chipColor}
      label={props.label}
      onClick={() => props.onClick(props.filter.id)}
      css={props.sticky ? skrinkedChips : undefined}
    />
  );
  if (props.tooltipLabel) {
    return (
      <Tooltip title={props.tooltipLabel} arrow>
        {chip}
      </Tooltip>
    );
  } else {
    return chip;
  }
};

const StyledChip = styled(Chip)(({ theme }) => ({
  lineHeight: 1,
  fontWeight: 500,
  borderRadius: '40px',
  height: 'fit-content',
  margin: '8px',
  padding: '8px',
  fontSize: 'clamp(16px, 1vw, 2rem)',
  transition: 'font-size 0.4s ease-in-out',
  boxShadow: '0px 5px 10px 0 rgba(191, 191, 191, 0.4)',
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
