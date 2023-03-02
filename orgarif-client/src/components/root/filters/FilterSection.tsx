/** @jsxImportSource @emotion/react */
import { Category } from '../../../domain/category';
import { FilterChip } from './FilterChip';
import { HeaderFiltersChip } from './HeaderFiltersChip';
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import * as React from 'react';

interface FilterSectionProps {
  filters?: Category[];
  categoryLabel: string;
  filterLabelAndTooltip: (f: Category) => [string, string?];
  sticky?: boolean | undefined;
  standalone?: boolean | undefined;
}

export const FilterSection = React.memo(
  ({
    filters,
    categoryLabel,
    filterLabelAndTooltip,
    sticky,
    standalone
  }: FilterSectionProps) => {
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
        <HeaderFiltersChip label={categoryLabel} />
        {filters &&
          filters.map(c => {
            const [label, tooltipLabel] = filterLabelAndTooltip(c);
            return (
              <FilterChip
                key={c.id}
                filter={c}
                label={label}
                tooltipLabel={tooltipLabel}
                isSticky={sticky}
              />
            );
          })}
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
