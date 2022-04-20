/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Chip } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import {
  Departement,
  NatureJuridique,
  Secteur,
  TypeStructure
} from '../domain/bootstrap-data';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from '../domain/ids';
import { Organigram } from '../icon/collection/Organigram';
import { state } from '../state/state';
import * as breakpoints from '../styles/breakpoints';
import { colors } from '../styles/colors';
import { asString } from '../utils/nominal-class';

interface FilterChipProps {
  filter: Departement | NatureJuridique | Secteur | TypeStructure;
  showIcon: boolean | undefined;
  isSticky: boolean | undefined;
}

export const isDepartement = (object: unknown): object is Departement => {
  return Object.prototype.hasOwnProperty.call(object, 'code');
};

export const FilterChip = ({ filter, showIcon, isSticky }: FilterChipProps) => {
  const [activeFilters, setActiveFilters] = useRecoilState(state.activeFilters);

  // Regex to check if libelle contains parentheses and if yes,
  // extract the value between parentheses to display the abbreviation.
  const regExp = /\((.*?)\)/;
  let newLibelle;
  if (filter.libelle.includes('(')) {
    newLibelle = regExp.exec(filter.libelle)![1];
  } else {
    newLibelle = filter.libelle;
  }

  const handleFilterClick = (
    id: DepartementId | NatureJuridiqueId | SecteurId | TypeStructureId
  ) => {
    const currentActiveFilters = [...activeFilters];
    const indexFilter = currentActiveFilters
      .map(f => f.id)
      .indexOf(asString(id));

    indexFilter === -1
      ? setActiveFilters((oldList: any) => [...oldList, filter])
      : setActiveFilters((oldList: any) => [
          ...oldList.filter((f: any) => f.id !== id)
        ]);
  };

  const chipColor = activeFilters.some((f: any) => f.id === filter.id)
    ? 'error'
    : 'primary';

  return (
    <>
      {showIcon ? (
        // Chip with icon
        <StyledChip
          key={filter.libelle}
          color={chipColor}
          icon={
            <Organigram size={isSticky ? '24px' : 'clamp(24px, 1.4vw, 2rem)'} />
          }
          label={filter.libelle}
          onClick={() => handleFilterClick(filter.id)}
          css={isSticky ? skrinkedChips : ''}
        />
      ) : isDepartement(filter) ? (
        // Chip with postal code
        <StyledChip
          key={filter.libelle}
          color={chipColor}
          label={`${filter.libelle} - ${filter.code}`}
          onClick={() => handleFilterClick(filter.id)}
          css={isSticky ? skrinkedChips : ''}
        />
      ) : (
        // Chip with tooltip
        <Tooltip title={filter.libelle} arrow>
          <StyledChip
            key={filter.libelle}
            color={chipColor}
            label={newLibelle}
            onClick={() => handleFilterClick(filter.id)}
            css={isSticky ? skrinkedChips : ''}
          />
        </Tooltip>
      )}
    </>
  );
};

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
