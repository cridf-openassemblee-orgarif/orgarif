/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import StarIcon from '@mui/icons-material/Star';
import StarOutline from '@mui/icons-material/StarOutline';
import { Chip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { BasicTableHead } from '../component/BasicTableHead';
import { DrawerComponent as Drawer } from '../component/Drawer';
import { EnhancedTableHead } from '../component/EnhancedTableHead';
import { Data, originalRows } from '../data/genericDataTable';
import { state } from '../state/state';
import { colors } from '../styles/colors';

type Order = 'asc' | 'desc';

interface Column {
  id: 'organisme' | 'localité' | 'département' | 'structure';
  label: string;
  minWidth?: number | string;
  align?: 'left' | 'center' | 'right';
}

const columns: Column[] = [
  { id: 'organisme', label: 'Organismes', minWidth: '30vw' },
  { id: 'localité', label: 'Localité', minWidth: '20vw' },
  {
    id: 'département',
    label: 'Département'
  },
  {
    id: 'structure',
    label: 'Type de Structure'
  }
];

// FIXME : ::after not showing in safari
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  position: 'relative',

  '&.MuiTableRow-root:hover': {
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    top: '1px',
    zIndex: 1,

    '& > .MuiTableCell-root': {
      color: '#fff',

      '& > .MuiCheckbox-root': {
        '& > .MuiChip-root': {
          border: '1px solid white',
          backgroundColor: 'transparent',
          transition: 'all 0s',

          '& > .MuiChip-label': {
            '& > .MuiSvgIcon-root': {
              transition: 'fill 0s',
              fill: 'white'
            }
          }
        }
      }
    }
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    borderBottom: `1px solid ${colors.dark}`,
    width: 'calc(100% - 100px)',
    left: '48px',
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 32px)',
      left: '16px'
    }
  },
  '&:hover': {
    '&::after': {
      borderBottom: 'none'
    }
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 'clamp(18px, 1.1vw, 1.2rem)',
  borderBottom: 'none',

  [theme.breakpoints.down('md')]: {
    padding: '4px 16px'
  }
}));

const SelectedIcon = () => (
  <Chip
    label={<StarIcon />}
    size="small"
    css={css`
      height: 2em;
      padding-top: 5px;
      padding-bottom: 1px;
      background-color: ${colors.errorRed};

      & svg {
        fill: white;
      }
    `}
  />
);
const UnSelectedIcon = () => (
  <Chip
    label={<StarOutline />}
    size="small"
    css={css`
      height: 2em;
      padding-top: 5px;
      background-color: white;
      border: 1px solid white;
    `}
  />
);

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | React.ReactElement },
  b: { [key in Key]: number | string | React.ReactElement }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export const MainTableContainer = React.memo(() => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [rows, setRows] = React.useState(originalRows);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('structure');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const TableRef = React.useRef<null | HTMLDivElement>(null);

  const [isOpened, setIsOpened] = useRecoilState(state.openedDrawer);

  const handleRequestSearch = (searchedVal: any) => {
    console.log(searchedVal.target.value);
    const filteredRows = originalRows.filter(row => {
      return row.organisme
        .toLowerCase()
        .includes(searchedVal.target.value.toLowerCase());
    });
    setRows(filteredRows);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    TableRef.current && TableRef.current.scrollTo(0, 0);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Paper
      css={css`
        width: 100%;
      `}
    >
      <Drawer />
      <TableContainer
        css={css`
          max-height: calc(100vh - calc(124px + 52px));
          position: relative;
        `}
        ref={TableRef}
      >
        <Table
          stickyHeader
          aria-label="sticky dense table"
          size="small"
          css={css`
            position: relative;
          `}
        >
          <TableHead>
            <TableRow>
              <BasicTableHead onRequestSearch={handleRequestSearch} />
            </TableRow>
            <TableRow>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
            </TableRow>
          </TableHead>
          <TableBody
            css={css`
              position: relative;
            `}
          >
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${idx}`;

                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={idx}
                    onClick={() => setIsOpened(!isOpened)}
                  >
                    {columns.map((column, idx) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell
                          key={idx}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            maxWidth: '300px',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden'
                          }}
                        >
                          {value}
                        </StyledTableCell>
                      );
                    })}
                    <StyledTableCell padding="checkbox" align="center">
                      <Checkbox
                        color="primary"
                        icon={<UnSelectedIcon />}
                        checkedIcon={<SelectedIcon />}
                        checked={isItemSelected}
                        onClick={event => handleClick(event, row.id)}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={originalRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
});
