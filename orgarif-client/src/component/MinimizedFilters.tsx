/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Chip } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { state } from '../state/state';

export const MinimizedFilters = () => {
  const [activeFilters, setActiveFilters] = useRecoilState(state.activeFilters);

  return (
    <Box
      onClick={e => e.stopPropagation()}
      css={css`
        margin-left: 60px;
        align-self: center;
        animation: ${fadeIn} 300ms 800ms both;
      `}
    >
      {activeFilters.map((filter: any) => {
        return filter.libelle.length > 20 ? (
          <Tooltip title={filter.libelle} arrow key={filter.id}>
            <Chip
              label={filter.libelle.toUpperCase()}
              size="small"
              color="error"
              deleteIcon={<ClearIcon />}
              onDelete={() =>
                setActiveFilters((oldList: any) => [
                  ...oldList.filter((item: any) => item !== filter)
                ])
              }
              css={css`
                padding: 0.25em;
                margin: 0.25em;
                max-width: 200px;
              `}
            />
          </Tooltip>
        ) : (
          <Chip
            label={filter.libelle.toUpperCase()}
            key={filter.id}
            size="small"
            color="error"
            deleteIcon={<ClearIcon />}
            onDelete={() =>
              setActiveFilters((oldList: any) => [
                ...oldList.filter((item: any) => item !== filter)
              ])
            }
            css={css`
              padding: 0.25em;
              margin: 0.25em;
              max-width: 200px;
            `}
          />
        );
      })}
    </Box>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
