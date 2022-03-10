/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';
import { SearchBar } from '../component/SearchBar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'none',
  maxWidth: '365px',
  minWidth: '365px',
  paddingLeft: '48px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '16px'
  }
}));

export const BasicTableHead = ({ onRequestSearch }: any) => {
  return (
    <>
      <StyledTableCell align="left" colSpan={1}>
        <Typography
          component="h5"
          variant="h4"
          css={css`
            font-size: clamp(24px, 2vw, 2.125rem);
            white-space: nowrap;
          `}
        >
          LISTE DES ORGANISMES
        </Typography>
      </StyledTableCell>
      <TableCell
        align="left"
        css={css`
          border-bottom: none;
          max-width: 365px;
          min-width: 365px;
        `}
        colSpan={1}
      >
        <SearchBar
          handleChange={(searchedVal: any) => onRequestSearch(searchedVal)}
        />
      </TableCell>
      <TableCell
        align="right"
        css={css`
          border-bottom: none;
          max-width: 365px;
          min-width: 365px;
        `}
        colSpan={3}
      >
        <Typography variant="caption" display="block">
          DERNIÈRE MISE À JOUR
        </Typography>
        <Typography variant="caption" display="block">
          25/01/2022
        </Typography>
      </TableCell>
    </>
  );
};
