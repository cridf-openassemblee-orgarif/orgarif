/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@mui/material';
import * as React from 'react';
import { FilterChip } from '../component/FilterChip';
import { HeaderChip } from '../component/HeaderChip';

const chipsContainer = css`
  display: flex;
  flex-wrap: wrap;
  position: sticky;
  position: static;
  transition: all 1s ease-in-out;
  height: fit-content;
`;

// TODO : typing props
export const FilterSection = ({
  filters,
  label,
  showIcon,
  sticky,
  standalone
}: any) => {
  const ChipRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      css={chipsContainer}
      sx={{
        top: sticky ? '80px' : '22vw',
        py: sticky ? '0.2em' : '1em',
        pl: standalone ? '1em' : '1em',
        pr: standalone ? 0 : '1em'
      }}
      ref={ChipRef}
    >
      <HeaderChip label={label} />
      {filters &&
        filters.map(
          (filter: { libelle: string; code?: string }, idx: number) => (
            <FilterChip
              filter={filter}
              isSticky={sticky}
              showIcon={showIcon}
              key={idx}
            />
          )
        )}
    </Box>
  );
};
