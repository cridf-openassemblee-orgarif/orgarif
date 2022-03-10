/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Chip } from '@mui/material';
import * as React from 'react';

// TODO : typing props
export const HeaderChip = ({ label }: any) => (
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
