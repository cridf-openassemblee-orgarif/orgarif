/** @jsxImportSource @emotion/react */
import { adminIdDisplayChars } from '../../domain/admin';
import { Role, UserInfos } from '../../generated/domain/User';
import { LoadingState } from '../../interfaces';
import { CopyContentWidget } from '../common/CopyContentWidget';
import { RouteLink } from '../routing/RouteLink';
import { colors } from '../styles/vars';
import { t } from './UsersManagementTable.i18n';
import { css } from '@emotion/react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import * as React from 'react';

export const RoleChip = (props: { role: Role }) => (
  <span
    css={css`
      margin: 0 2px;
      padding: 4px 10px;
      background: ${colors.clearGrey};
      border-radius: 4px;
    `}
  >
    {props.role}
  </span>
);

export const UsersManagementTable = (props: {
  users: UserInfos[];
  loading: LoadingState;
}) => {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t.UserId(),
      renderCell: (p: GridRenderCellParams<UserInfos>) => (
        <CopyContentWidget text={p.row.id} limitChars={adminIdDisplayChars} />
      ),
      flex: 1,
      maxWidth: 120,
      sortable: false,
      filterable: false
    },
    {
      field: 'email',
      headerName: t.Email(),
      renderCell: (p: GridRenderCellParams<UserInfos>) => (
        <CopyContentWidget text={p.row.mail} />
      ),
      flex: 1,
      sortable: false,
      filterable: false
    },
    {
      field: 'displayName',
      headerName: t.DisplayName(),
      renderCell: (p: GridRenderCellParams<UserInfos>) => (
        <div>{p.row.displayName}</div>
      ),
      flex: 1,
      sortable: false,
      filterable: false
    },
    {
      field: 'roles',
      headerName: t.Roles(),
      renderCell: (p: GridRenderCellParams<UserInfos>) => (
        <div>
          {p.row.roles.map(r => (
            <RoleChip role={r} />
          ))}
        </div>
      ),
      flex: 1,
      sortable: false,
      filterable: false
    },
    {
      field: 'details',
      headerName: '',
      renderCell: (p: GridRenderCellParams<UserInfos>) => (
        <RouteLink
          element="Button"
          variant="outlined"
          route={{
            name: 'UsersManagementUserRoute',
            userId: p.row.id
          }}
        >
          {t.Details()}
        </RouteLink>
      ),
      flex: 1,
      maxWidth: 120,
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
