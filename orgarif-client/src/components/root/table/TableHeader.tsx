/** @jsxImportSource @emotion/react */
import { breakpoints } from '../../styles/breakpoints';
import { colors } from '../../styles/colors';
import { SearchBar } from './SearchBar';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

interface TableHeaderProps {
  onSearch: (searchedValue: string) => void;
}

// TODO : missing dynamization for last updated date
export const TableHeader = ({ onSearch }: TableHeaderProps) => {
  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 8px 8px;
        border-top: 1px solid ${colors.dark};
        border-bottom: 1px solid ${colors.dark};
        margin-bottom: 0.5em;

        @media (${breakpoints.TABLET}) {
          flex-direction: row;
        }

        @media (${breakpoints.LAPTOP}) {
          padding: 12px 48px;
        }
      `}
    >
      <Typography
        component="h5"
        variant="h4"
        css={css`
          font-size: 2rem;
          white-space: nowrap;
          min-width: 260px;
          text-transform: uppercase;

          @media (${breakpoints.LAPTOP}) {
            max-width: 140px;
            min-width: 100px;
          }
        `}
      >
        Liste des organismes
      </Typography>
      <SearchBar
        handleChange={searchedValue => onSearch(searchedValue.target.value)}
      />
    </Box>
  );
};
