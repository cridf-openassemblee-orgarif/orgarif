/** @jsxImportSource @emotion/react */
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import * as React from 'react';
import { css } from '@emotion/react';
import { UserInfos } from '../../generated/domain/user';
import { CopyContentWidget } from '../../component/base-component/CopyContentWidget';
import { adminIdDisplayChars } from '../../generated/domain/admin';
import { LoadingState } from '../../interfaces';
import { colors } from '../../styles/vars';
import { RouteLink } from '../../routing/RouteLink';

export const UsersManagementTable = (props: {
  users: UserInfos[];
  loading: LoadingState;
}) => {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'User id',
      renderCell: (p: GridRenderCellParams<void, UserInfos>) => (
        <CopyContentWidget text={p.row.id} limitChars={adminIdDisplayChars} />
      ),
      flex: 1,
      maxWidth: 120,
      sortable: false,
      filterable: false
    },
    {
      field: 'email',
      headerName: 'Email',
      renderCell: (p: GridRenderCellParams<void, UserInfos>) => (
        <CopyContentWidget text={p.row.mail} />
      ),
      flex: 1,
      sortable: false,
      filterable: false
    },
    {
      field: 'displayName',
      headerName: 'Display name',
      renderCell: (p: GridRenderCellParams<void, UserInfos>) => (
        <div>{p.row.displayName}</div>
      ),
      flex: 1,
      sortable: false,
      filterable: false
    },
    {
      field: 'roles',
      headerName: 'Roles',
      renderCell: (p: GridRenderCellParams<void, UserInfos>) => (
        <div>
          {p.row.roles.map(r => (
            <span
              css={css`
                margin: 0 2px;
                padding: 4px 10px;
                background: ${colors.clearGrey};
                border-radius: 4px;
              `}
            >
              {r}
            </span>
          ))}
        </div>
      ),
      flex: 1,
      sortable: false,
      filterable: false
    },
    {
      field: 'edit',
      headerName: '',
      renderCell: (p: GridRenderCellParams<void, UserInfos>) => (
        <RouteLink
          element="Button"
          variant="outlined"
          route={{
            name: 'UsersManagementUserRoute',
            userId: p.row.id
          }}
        >
          Edit
        </RouteLink>
      ),
      flex: 1,
      maxWidth: 80,
      sortable: false,
      filterable: false
    }
  ];
  return (
    <DataGrid
      rows={props.users}
      getRowId={(c: UserInfos) => c.id}
      columns={columns}
      loading={props.loading === 'Loading'}
      error={props.loading === 'Error' ? true : undefined}
      autoPageSize={true}
      css={css`
        .MuiDataGrid-row {
          &:nth-child(odd) {
            background-color: ${colors.clearGrey2};
          }

          &:hover {
            background-color: ${colors.clearGrey};
          }
        }
      `}
    />
  );
};
