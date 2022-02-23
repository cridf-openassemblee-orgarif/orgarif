/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import * as React from 'react';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';

export const SingleOrganisme = () => {
  return (
    <Box
      css={css`
        display: grid;
        grid-template-columns: 51% 49%;
      `}
    >
      <LeftPanel />
      <RightPanel />
    </Box>
  );
};
