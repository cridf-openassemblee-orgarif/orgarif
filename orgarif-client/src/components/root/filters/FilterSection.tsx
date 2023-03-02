/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import * as React from 'react';
import { Category } from '../../domain/bootstrap-data';
import { asString } from '../../utils/nominal-class';
import { FilterChip } from './FilterChip';
import { HeaderFiltersChip } from './HeaderFiltersChip';

interface FilterSectionProps<T extends Category> {
  filters?: T[];
  categoryLabel: string;
  filterLabelAndTooltip: (f: T) => [string, string?];
  sticky?: boolean | undefined;
  standalone?: boolean | undefined;
}

export const FilterSection = React.memo(
  <T extends Category>({
    filters,
    categoryLabel,
    filterLabelAndTooltip,
    sticky,
    standalone
  }: FilterSectionProps<T>) => {
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
                key={asString(c.id)}
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
