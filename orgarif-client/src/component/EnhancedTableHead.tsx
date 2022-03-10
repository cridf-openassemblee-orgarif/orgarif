/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import * as React from 'react';
import { Data } from '../data/genericDataTable';
import { Share } from '../icon/collection/Share';
import * as breakpoint from '../styles/breakpoints';
import { colors } from '../styles/colors';

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'organisme',
    numeric: false,
    label: 'organismes'
  },
  {
    id: 'localité',
    numeric: false,
    label: 'localité'
  },
  {
    id: 'département',
    numeric: true,
    label: 'département'
  },
  {
    id: 'structure',
    numeric: false,
    label: 'structure'
  }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'none',
  maxWidth: '205px',
  minWidth: '205px',
  padding: '18px 48px ',
  [theme.breakpoints.down('md')]: {
    padding: '18px 8px'
  }
}));

export const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <React.Fragment>
      {headCells.map(headCell => (
        <StyledTableCell
          key={headCell.id}
          align="left"
          sortDirection={orderBy === headCell.id ? order : false}
          css={css`
            top: 61px;

            @media (${breakpoint.DESKTOP}) {
              top: 63px;
            }

            // Safari hack to have the two stacked head row sticky
            @media not all and (min-resolution: 0.001dpcm) {
              @supports (-webkit-appearance: none) {
                top: 118px;

                @media (${breakpoint.DESKTOP}) {
                  top: 124px;
                }
              }
            }
          `}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
            css={css`
              background-color: ${orderBy === headCell.id
                ? colors.errorRed
                : colors.white};
              color: ${orderBy === headCell.id
                ? `${colors.white} !important`
                : colors.dark};
              border-radius: 5em;
              padding: 0 1em 0 0.5em;
              flex-direction: row-reverse;
              & svg {
                opacity: 1;
                fill: ${orderBy === headCell.id
                  ? `${colors.white} !important`
                  : 'inherit'};
              }
            `}
          >
            {headCell.label === 'organismes'
              ? `${rowCount} ${headCell.label.toUpperCase()}`
              : headCell.label.toUpperCase()}
            <Box component="span" sx={visuallyHidden}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
          </TableSortLabel>
        </StyledTableCell>
      ))}
      <TableCell
        css={css`
          top: 61px;
          border-bottom: none;

          @media (${breakpoint.DESKTOP}) {
            top: 63px;
          }

          // Safari hack to have the two stacked head row sticky
          @media not all and (min-resolution: 0.001dpcm) {
            @supports (-webkit-appearance: none) {
              top: 118px;

              @media (${breakpoint.DESKTOP}) {
                top: 124px;
              }
            }
          }
        `}
      >
        <Chip
          label="ENVOYER LA SÉLECTION"
          icon={<Share size={20} />}
          size="small"
          css={css`
            background-color: ${colors.white};
            color: ${colors.dark};
            padding: 0 0.5em 0 0.5em;

            :hover {
              background-color: ${colors.errorRed};
              color: ${colors.white};

              & svg {
                fill: ${colors.white};
              }
            }

            & svg {
              fill: ${colors.dark};
            }
          `}
          onClick={() => console.log('envoyer sélection')}
        />
      </TableCell>
    </React.Fragment>
  );
};
