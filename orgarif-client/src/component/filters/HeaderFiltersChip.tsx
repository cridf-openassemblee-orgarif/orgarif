/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Chip } from '@mui/material';

interface HeaderFiltersChipProps {
  label: string;
}

export const HeaderFiltersChip = ({ label }: HeaderFiltersChipProps) => {
  return (
    <Chip
      label={label.toUpperCase()}
      variant="outlined"
      size="small"
      css={css`
        font-size: clamp(12px, 0.5vw, 1rem);
        margin-top: 8px;
        padding: 0.2em 0.4em;
        box-shadow: none;
      `}
    />
  );
};
