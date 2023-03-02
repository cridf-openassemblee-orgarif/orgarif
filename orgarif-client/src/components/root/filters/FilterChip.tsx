/** @jsxImportSource @emotion/react */
import { Category, CategoryId } from '../../../domain/category';
import { state } from '../../../state/state';
import * as breakpoints from '../../styles/breakpoints';
import { colors } from '../../styles/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Chip } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

interface FilterChipProps {
  filter: Category;
  label: string;
  tooltipLabel?: string;
  isSticky: boolean | undefined;
}

export const FilterChip = ({
  filter,
  label,
  tooltipLabel,
  isSticky
}: FilterChipProps) => {
  const [activeFilters, setActiveFilters] = useRecoilState(state.activeFilters);
  const navigate = useNavigate();

  const handleFilterClick = (id: CategoryId) => {
    const currentActiveFilters = [...activeFilters];
    const indexFilter = currentActiveFilters.map(f => f.id).indexOf(id);

    indexFilter === -1
      ? setActiveFilters((prevList: Category[]) => [...prevList, filter])
      : setActiveFilters((prevList: Category[]) => [
          ...prevList.filter((f: Category) => f.id !== id)
        ]);
    navigate('/organismes');
  };

  const chipColor = activeFilters.some((f: Category) => f.id === filter.id)
    ? 'error'
    : 'primary';

  const chip = (
    <StyledChip
      key={filter.libelle}
      color={chipColor}
      label={label}
      onClick={() => handleFilterClick(filter.id)}
      css={isSticky ? skrinkedChips : ''}
    />
  );
  if (tooltipLabel) {
    return (
      <Tooltip title={tooltipLabel} arrow>
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
