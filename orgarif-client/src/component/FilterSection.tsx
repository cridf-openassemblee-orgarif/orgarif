/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import * as React from 'react';
import {
  Departement,
  NatureJuridique,
  Secteur,
  TypeStructure
} from '../domain/bootstrap-data';
import { asString } from '../utils/nominal-class';
import { FilterChip } from './FilterChip';
import { HeaderChip } from './HeaderChip';

interface FilterSectionProps {
  filters?: Departement[] | NatureJuridique[] | Secteur[] | TypeStructure[];
  label: string;
  showIcon?: boolean | undefined;
  sticky?: boolean | undefined;
  standalone?: boolean | undefined;
}

export const FilterSection = React.memo(
  ({ filters, label, showIcon, sticky, standalone }: FilterSectionProps) => {
    return (
      <Box
        css={chipsContainer}
        sx={{
          top: sticky ? '80px' : '22vw',
          py: sticky ? '0.4em' : '.8vw',
          pl: standalone ? '1em' : '1em',
          pr: standalone ? 0 : '1em'
        }}
      >
        <HeaderChip label={label} />
        {filters &&
          filters.map(
            (
              filter: Departement | NatureJuridique | Secteur | TypeStructure
            ) => (
              <FilterChip
                filter={filter}
                isSticky={sticky}
                showIcon={showIcon}
                key={asString(filter.id)}
              />
            )
          )}
      </Box>
    );
  }
);

const chipsContainer = css`
  display: flex;
  flex-wrap: wrap;
  position: sticky;
  position: static;
  transition: all 1s ease-in-out;
  height: fit-content;
`;
