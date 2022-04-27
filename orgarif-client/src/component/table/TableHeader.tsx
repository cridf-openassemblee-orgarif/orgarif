/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import * as breakpoint from '../../styles/breakpoints';
import { colors } from '../../styles/colors';
import { SearchBar } from './SearchBar';

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
        margin-bottom: 1em;

        @media (${breakpoint.TABLET}) {
          flex-direction: row;
        }

        @media (${breakpoint.LAPTOP}) {
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

          @media (${breakpoint.LAPTOP}) {
            max-width: 140px;
            min-width: 100px;
          }
        `}
      >
        LISTE DES ORGANISMES
      </Typography>
      <SearchBar
        handleChange={searchedValue => onSearch(searchedValue.target.value)}
      />
      <Box
        css={css`
          display: flex;
          flex-direction: row;
          margin: 0 auto;

          @media (${breakpoint.TABLET}) {
            margin: 0;
            flex-direction: column;
          }
        `}
      >
        <Typography
          variant="caption"
          css={css`
            margin-right: 5px;
          `}
        >
          DERNIÈRE MISE À JOUR{' '}
        </Typography>
        <Typography variant="caption">25/01/2022</Typography>
      </Box>
    </Box>
  );
};
