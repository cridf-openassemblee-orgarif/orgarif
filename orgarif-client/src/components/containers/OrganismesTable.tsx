/** @jsxImportSource @emotion/react */
import {
  DepartementId,
  OrganismeId,
  TypeStructureId
} from '../../generated/domain/ids';
import { ListOrganismesQueryResponse } from '../../generated/query/queries';
import { Edit } from '../../icon/collection/Edit';
import { LoadingState } from '../../interfaces';
import { appContext } from '../../services/ApplicationContext';
import { state } from '../../state/state';
import { asNominalString, getValue } from '../../utils/nominal-class';
import { isMobile } from '../../utils/viewport-utils';
import { RouteLink } from '../routing/RouteLink';
import { breakpoints } from '../styles/breakpoints';
import { colors } from '../styles/colors';
import { css } from '@emotion/react';
import { Chip, Tooltip } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import {
  DataGrid,
  frFR,
  GridColDef,
  GridRenderCellParams,
  GridRowId
} from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const OrganismesTable = () => {
  const [loading, setLoading] = useState<LoadingState>('Idle');
  const [organismes, setOrganismes] = useRecoilState(state.organismes);
  const filters = useRecoilValue(state.filters);

  // const requestSearch = (searchedValue: string) => {
  // if (activeFilters.length > 0 && searchedValue.length >= 3) {
  //   const filteredRows = organismes?.filter(row => {
  //     setLoading(true);
  //     return row.nom.toLowerCase().includes(searchedValue.toLowerCase());
  //   });
  //   if (filteredRows) {
  //     setRows(filteredRows);
  //   }
  //   setLoading(false);
  // } else if (activeFilters.length === 0 && searchedValue.length >= 3) {
  //   // TODO - send request to server...
  //   setLoading(true);
  //   console.log('fetching results from server...');
  //   setTimeout(() => setLoading(false), 1000);
  // } else if (searchedValue.length === 0) {
  //   if (organismes) setRows(organismes);
  // }
  // Temp search feature
  useEffect(() => {
    setLoading('Loading');
    appContext
      .queryService()
      .send<ListOrganismesQueryResponse>({
        objectType: 'ListOrganismesQuery',
        ...filters,
        // TODO
        page: 0,
        // TODO
        itemsNumber: 25,
        // TODO
        orderBy: 'nom'
      })
      .then(r => {
        setOrganismes(r.organismes);
        setLoading('Idle');
      });
  }, [filters]);

  return (
    <Box
      sx={overrideStyleGrid}
      css={css`
        width: 100%;
        padding: 0 8px;

        @media (${breakpoints.TABLET}) {
          padding: 0 24px;
        }

        @media (${breakpoints.LAPTOP}) {
          padding: 0 48px;
        }
      `}
    >
      <DataGrid
        rows={organismes}
        columns={columns}
        disableColumnMenu
        disableDensitySelector
        rowHeight={38}
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        initialState={{
          columns: {
            // TODO check
            columnVisibilityModel: {
              departement: isMobile() ? false : true,
              typeStructureId: isMobile() ? false : true,
              selection: isMobile() ? false : true
            }
          }
        }}
        // rowBuffer={50}
        hideFooterSelectedRowCount
        // rowsPerPageOptions={[50, 100, 200]}
        autoHeight={true}
        components={{
          LoadingOverlay: LinearProgress,
          NoRowsOverlay: CustomNoRowsOverlay
        }}
        loading={loading === 'Loading'}
      />
    </Box>
  );
};

const CountChip = () => {
  const count = useRecoilValue(state.organismes).length;
  return <HeaderChip label={`${count} ORGANISMES`} />;
};
const columns: GridColDef[] = [
  {
    field: 'nom',
    headerName: `Organismes`,
    minWidth: 250,
    flex: 1,
    renderHeader: () => <CountChip />,
    renderCell: (params: GridRenderCellParams) => (
      <RouteLink route={{ name: 'OrganismeRoute', id: params.row.id }}>
        {params.formattedValue}
      </RouteLink>
    )
  },
  {
    field: 'departement',
    headerName: 'Département',
    minWidth: 150,
    flex: 0.3,
    renderHeader: () => <HeaderChip size="small" label="DÉPARTEMENT" />,
    renderCell: (params: GridRenderCellParams) => (
      <DepartementRow id={params.row.departementId} />
    )
  },
  {
    field: 'typeStructureId',
    headerName: 'Type de Structure',
    minWidth: 180,
    flex: 0.4,
    renderHeader: () => <HeaderChip size="small" label="TYPE DE STRUCTURE" />,
    renderCell: (params: GridRenderCellParams) => (
      <TypeStructureRow id={params.row.typeStructureId} />
    )
  },
  {
    field: 'action',
    headerName: '',
    minWidth: 120,
    maxWidth: 120,
    flex: 0.4,
    align: 'center',
    sortable: false,
    renderHeader: () => <></>,
    renderCell: (params: GridRenderCellParams) => <EditRow id={params.id} />
  }
];

const TypeStructureRow = (props: { id: TypeStructureId | undefined }) => {
  const t = useRecoilValue(state.typeStructuresById);
  if (!props.id) {
    return <></>;
  }
  const typeStructure = getValue(t, props.id);
  return (
    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {typeStructure?.libelle ?? '-'}
    </span>
  );
};

const DepartementRow = (props: { id: DepartementId | undefined }) => {
  const d = useRecoilValue(state.departementsById);
  if (!props.id) {
    return <></>;
  }
  const departement = getValue(d, props.id);
  return <>{`${departement?.libelle ?? ''} - ${departement?.code ?? ''}`}</>;
};

const HeaderChip = styled(Chip)(({ theme }) => ({
  backgroundColor: colors.white,
  color: colors.dark,
  padding: '0em .5em',
  height: '24px',
  cursor: 'pointer'
}));

export const EditOrganismeLink = (props: { organismeId: OrganismeId }) => (
  <RouteLink
    route={{ name: 'EditOrganismeRoute', id: props.organismeId }}
    {...props}
  />
);
const EditRow = (props: { id: GridRowId }) => {
  const userInfos = useRecoilValue(state.userInfos);
  const organismeId = asNominalString<OrganismeId>(props.id as string);
  if (!userInfos) {
    return <></>;
  }
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
          cursor: pointer;
        `}
        component={EditOrganismeLink}
        {...{ organismeId }}
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
      <Box css={{ mt: 1 }}>Aucun résultat ne correspond à votre recherche</Box>
    </StyledGridOverlay>
  );
};

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: '3em',
  [theme.breakpoints.up('md')]: {
    marginTop: '8em'
  },
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
    color: `${colors.white} !important`
  },
  '& .MuiDataGrid-row:hover a': {
    backgroundColor: `${colors.errorRed} !important`,
    color: `${colors.white} !important`
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
  },
  '& .MuiDataGrid-columnHeadersInner': {
    transform:
      'none !important' /* Firefox fix to prevent chips layout from being altered */
  },
  '& .MuiDataGrid-columnHeaders': {
    borderBottom: 'none'
  }
};
