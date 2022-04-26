/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import StarIcon from '@mui/icons-material/Star';
import StarOutline from '@mui/icons-material/StarOutline';
import { Checkbox, Chip, Tooltip } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import {
  DataGrid,
  frFR,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
  GridRowId,
  GridRowsProp
} from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TableHeader } from '../component/TableHeader';
import { listOrganismes } from '../data/listOrganismes';
import { Edit } from '../icon/collection/Edit';
import { Share } from '../icon/collection/Share';
import { state } from '../state/state';
import * as breakpoint from '../styles/breakpoints';
import { colors } from '../styles/colors';
import { isMobile } from '../utils/viewport-utils';

export const TableContainer = () => {
  const [rows, setRows] = React.useState<GridRowsProp>(listOrganismes);
  const [isOpened, setIsOpened] = useRecoilState(state.openedDrawer);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [activeFilters] = useRecoilState(state.activeFilters);
  const enableScrollOnTable = useRecoilValue(state.enableScrollOnTable);
  const userInfos = useRecoilValue(state.userInfos);

  const navigate = useNavigate();

  // TODO:  search feature request to server
  const requestSearch = (searchedValue: string) => {
    if (activeFilters.length > 0 && searchedValue.length >= 3) {
      const filteredRows = listOrganismes.filter(row => {
        setLoading(true);
        return row.organisme
          .toLowerCase()
          .includes(searchedValue.toLowerCase());
      });
      setRows(filteredRows);
      setLoading(false);
    } else if (activeFilters.length === 0 && searchedValue.length >= 3) {
      // TODO - send request to server...
      setLoading(true);
      console.log('fetching results from server...');
      setTimeout(() => setLoading(false), 1000);
    } else if (searchedValue.length === 0) {
      setRows(listOrganismes);
    }
  };

  const handleRowClick = (id: GridRowId) => {
    setIsOpened(true);
    navigate(`../organisme/${id}`, { replace: false });
  };

  React.useEffect(() => {
    //TODO - request server
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
    //  appContext
    //    .queryService()
    //    .getFilteredListOrganismeQuery({ id })
    //    .then(r => {
    //      setRows(r.organismes);
    //    });
    // const filteredRows = listOrganismes.filter(row => {
    // setLoading(true);
    // return row.organisme.toLowerCase().includes(searchValue.toLowerCase());
    // });
    // setRows(filteredRows);
  }, [activeFilters]);

  return (
    <>
      <TableHeader onSearch={requestSearch} />
      <div
        id="table"
        css={css`
          height: calc(100vh - 72px);
          width: 100%;
          padding: 0px;

          @media (${breakpoint.TABLET}) {
            padding: 0px 24px;
          }

          @media (${breakpoint.LAPTOP}) {
            height: calc(100vh - 215px);
            padding: 0px 48px;
          }
        `}
      >
        <Box
          sx={overrideStyleGrid}
          css={css`
            .MuiDataGrid-virtualScroller {
              // disable scroll on table until filters section hides completely
              @media (${breakpoint.LAPTOP}) {
                overflow-y: ${enableScrollOnTable ? 'auto' : 'hidden'};
              }
            }
          `}
        >
          <DataGrid
            rows={rows}
            columns={userInfos ? columnsEdit : columns}
            disableColumnMenu
            disableDensitySelector
            rowHeight={38}
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            onCellClick={details => {
              handleRowClick(details.id);
              setIsOpened(!isOpened);
            }}
            initialState={{
              sorting: {
                sortModel: [{ field: 'organisme', sort: 'asc' }]
              },
              columns: {
                columnVisibilityModel: {
                  département: isMobile() ? false : true,
                  structure: isMobile() ? false : true,
                  selection: isMobile() ? false : true
                }
              }
            }}
            rowBuffer={5}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[50, 100, 200]}
            components={{
              LoadingOverlay: LinearProgress,
              NoRowsOverlay: CustomNoRowsOverlay
            }}
            loading={loading}
          />
        </Box>
      </div>
    </>
  );
};

const columns: GridColDef[] = [
  {
    field: 'organisme',
    headerName: `Organismes`,
    minWidth: 250,
    flex: 1,
    renderHeader: (params: GridColumnHeaderParams) => (
      <HeaderChip size="small" label={`${listOrganismes.length} ORGANISMES`} />
    )
  },
  {
    field: 'localité',
    headerName: 'Localité',
    minWidth: isMobile() ? 120 : 150,
    flex: 0.5,
    renderHeader: (params: GridColumnHeaderParams) => (
      <HeaderChip size="small" label="LOCALITÉ" />
    )
  },
  {
    field: 'département',
    headerName: 'Département',
    minWidth: 150,
    flex: 0.3,
    renderHeader: (params: GridColumnHeaderParams) => (
      <HeaderChip size="small" label="DÉPARTEMENT" />
    ),
    renderCell: (params: GridRenderCellParams) =>
      params.formattedValue.toString().slice(0, 2)
  },
  {
    field: 'structure',
    headerName: 'Type de Structure',
    minWidth: 180,
    flex: 0.4,
    renderHeader: (params: GridColumnHeaderParams) => (
      <HeaderChip size="small" label="TYPE DE STRUCTURE" />
    )
  },
  {
    field: 'selection',
    headerName: 'Envoyer la sélection',
    minWidth: 220,
    maxWidth: 220,
    flex: 0.4,
    align: 'center',
    sortable: false,
    renderHeader: (params: GridColumnHeaderParams) => <HeaderChipWithState />,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <SelectRow id={params.id} />
      </>
    )
  }
];

const columnsEdit: GridColDef[] = [
  {
    field: 'organisme',
    headerName: `Organismes`,
    minWidth: 250,
    flex: 1,
    renderHeader: (params: GridColumnHeaderParams) => (
      <HeaderChip size="small" label={`${listOrganismes.length} ORGANISMES`} />
    )
  },
  {
    field: 'localité',
    headerName: 'Localité',
    minWidth: 150,
    flex: 0.5,
    renderHeader: (params: GridColumnHeaderParams) => (
      <HeaderChip size="small" label="LOCALITÉ" />
    )
  },
  {
    field: 'département',
    headerName: 'Département',
    minWidth: 150,
    flex: 0.3,
    renderHeader: (params: GridColumnHeaderParams) => (
      <HeaderChip size="small" label="DÉPARTEMENT" />
    ),
    renderCell: (params: GridRenderCellParams) =>
      params.formattedValue.toString().slice(0, 2)
  },
  {
    field: 'structure',
    headerName: 'Type de Structure',
    minWidth: 180,
    flex: 0.4,
    renderHeader: (params: GridColumnHeaderParams) => (
      <HeaderChip size="small" label="TYPE DE STRUCTURE" />
    )
  },
  {
    field: 'selection',
    headerName: 'Envoyer la sélection',
    minWidth: 220,
    maxWidth: 220,
    flex: 0.4,
    align: 'center',
    sortable: false,
    renderHeader: (params: GridColumnHeaderParams) => <HeaderChipWithState />,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <SelectRow id={params.id} />
        <EditRow id={params.id} />
      </>
    )
  }
];

const SelectRow = ({ id }: any) => {
  const [userSelection, setUserSelection] = useRecoilState(state.userSelection);

  const handleClick = () => {
    const currentSelection = [...userSelection];
    const indexSelection = currentSelection.indexOf(id);

    indexSelection === -1
      ? setUserSelection((oldList: any) => [...oldList, id])
      : setUserSelection((oldList: any) => [
          ...oldList.filter((item: any) => item !== id)
        ]);
  };

  return (
    <Tooltip
      title={
        userSelection.includes(id)
          ? 'Retirer de la sélection'
          : 'Ajouter à la sélection'
      }
      arrow
      placement="left-start"
    >
      <Checkbox
        icon={<UnSelectedIcon />}
        checkedIcon={<SelectedIcon />}
        checked={userSelection.includes(id)}
        onClick={event => {
          event.stopPropagation();
          handleClick();
        }}
      />
    </Tooltip>
  );
};

const HeaderChip = styled(Chip)(({ theme }) => ({
  backgroundColor: colors.white,
  color: colors.dark,
  padding: '0em .5em'
}));

const HeaderChipWithState = () => {
  const [userSelection] = useRecoilState(state.userSelection);

  return (
    <>
      <HeaderChip
        size="small"
        label="ENVOYER LA SÉLECTION"
        icon={<Share size={20} />}
        onClick={() => console.log(userSelection)}
        css={css`
          justify-self: center;
          :hover {
            background-color: ${colors.errorRed};
            color: ${colors.white};
            svg {
              fill: ${colors.white};
            }
          }
        `}
      />
    </>
  );
};

const SelectedIcon = () => (
  <Chip
    label={<StarIcon />}
    size="small"
    css={css`
      height: 2em;
      padding-top: 5px;
      padding-bottom: 1px;
      background-color: ${colors.errorRed};
      border: 1px solid white;

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
const EditRow = ({ id }: any) => {
  const navigate = useNavigate();
  return (
    <Tooltip
      title="Éditer la fiche de l'organisme"
      arrow
      placement="left-start"
    >
      <Chip
        label={<Edit size={24} />}
        size="small"
        css={css`
          height: 2em;
          background-color: white;
          margin-left: 4em;
          border: 1px solid white;

          :hover {
            background-color: ${colors.errorRed};
            color: white;
            border: 1px solid white;
          }
        `}
        onClick={e => {
          e.stopPropagation();
          navigate(`/organisme/${id}/edit`);
        }}
      />
    </Tooltip>
  );
};

const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <svg
        width="180"
        height="160"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>Aucun résultat ne correspond à votre recherche</Box>
    </StyledGridOverlay>
  );
};

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#b6bdc4' : '#262626'
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f0f0f0' : '#595959'
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#d0d3d8' : '#434343'
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c'
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#e9e9e9' : '#fff'
  }
}));

const overrideStyleGrid = {
  height: 1,
  width: 1,
  '& .MuiDataGrid-root': {
    border: 'none'
  },
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${colors.dark} !important`
  },
  '& .MuiDataGrid-cellContent': {
    textTransform: 'lowercase',
    '&::first-letter': {
      textTransform: 'uppercase'
    }
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none !important'
  },
  '& .MuiDataGrid-cell:focus-within': {
    outline: 'none !important'
  },
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 'none !important'
  },
  '& .MuiDataGrid-columnHeader:focus-within,': {
    outline: 'none !important'
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none !important'
  },
  '& .MuiCheckbox-root.MuiButtonBase-root ': {
    padding: 0
  },
  '& .MuiCheckbox-root:hover ': {
    backgroundColor: 'transparent'
  },
  '& .MuiDataGrid-row.Mui-selected': {
    backgroundColor: `transparent !important`
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: `${colors.errorRed} !important`,
    color: `${colors.white} !important`,
    cursor: 'pointer'
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
    display: 'none !important' /* hide scrollbar */
  },
  '& .MuiDataGrid-virtualScroller': {
    msOverflowStyle: 'none' /* for Internet Explorer, Edge */,
    scrollbarWidth: 'none' /* for Firefox */,
    overflowY: 'scroll'
  },
  '& .MuiDataGrid-columnHeader--sorted': {
    '& .MuiChip-root': {
      backgroundColor: colors.errorRed,
      color: colors.white
    }
  }
};
