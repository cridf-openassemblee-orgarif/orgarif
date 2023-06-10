/** @jsxImportSource @emotion/react */
import { roleEnumValues } from '../../domain/enums';
import { Errors } from '../../errors';
import { UserId } from '../../generated/domain/fmk-ids';
import { Role, UserInfos } from '../../generated/domain/user';
import { GetUserInfosQueryResponse } from '../../generated/query/queries';
import { LoadingState } from '../../interfaces';
import { appContext } from '../../services/ApplicationContext';
import { state } from '../../state/state';
import { LoadingStateButton } from '../common/LoadingButton';
import { useGoTo } from '../routing/routing-utils';
import { colors } from '../styles/colors';
import { css } from '@emotion/react';
import { Warning as WarningIcon } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import * as React from 'react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

// TODO find a dedicated name ? it's almost a DialogView
export const UserEditRolesDialog = (props: {
  userId: UserId | undefined;
  updateUserInfos: (user: UserInfos) => void;
}) => {
  const [userInfos, setUserInfos] = useState<UserInfos | undefined>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [queryLoading, setQueryLoading] = useState<LoadingState>('Idle');
  const [updateLoading, setUpdateLoading] = useState<LoadingState>('Idle');
  const goTo = useGoTo();
  const loggedInUserInfos = useRecoilValue(state.userInfos);
  if (!loggedInUserInfos) {
    throw Errors._fe2e1fc7();
  }
  useEffect(() => {
    if (props.userId) {
      // keep after if (props.userId) for dialog disappearing animation
      setUserInfos(undefined);
      setRoles([]);
      setQueryLoading('Loading');
      appContext.queryService
        .send<GetUserInfosQueryResponse>({
          objectType: 'GetUserInfosQuery',
          userId: props.userId
        })
        .then(r => {
          setQueryLoading('Idle');
          setUserInfos(r.userInfos);
          setRoles(r.userInfos?.roles ?? []);
        });
    }
  }, [props.userId]);
  const close = () => {
    if (props.userId) {
      goTo({ name: 'UsersManagementUserRoute', userId: props.userId });
    }
  };
  const save = () => {
    if (!userInfos) {
      throw Errors._8ab803a9();
    }
    if (!props.userId) {
      throw Errors._d4c0ce89();
    }
    if (roles !== userInfos.roles) {
      setUpdateLoading('Loading');
      appContext.commandService
        .send({
          objectType: 'AdminUpdateRolesCommand',
          userId: props.userId,
          roles
        })
        .then(() => {
          setUpdateLoading('Idle');
          props.updateUserInfos({ ...userInfos, roles });
          close();
        });
    }
  };
  return (
    <Dialog
      open={!!props.userId}
      onClose={close}
      maxWidth={'lg'}
      fullWidth={true}
      scroll="body"
    >
      <DialogTitle>Edit user roles</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {queryLoading === 'Loading' && (
            <div
              css={css`
                text-align: center;
              `}
            >
              <CircularProgress size={18} />
            </div>
          )}
          <div>
            <Autocomplete
              multiple
              options={roleEnumValues}
              getOptionLabel={role => role as any}
              value={roles as any[]}
              renderInput={params => <TextField {...params} />}
              onChange={(_, roles) => setRoles(roles)}
            />
            {userInfos &&
              loggedInUserInfos.id === userInfos.id &&
              !roles.includes('Admin') && (
                <WarningMessage>
                  En vous enlevant le rôle d'admin vous ne pourrez plus éditer
                  les droits, et ne pourrez donc plus reprendre le rôle.
                </WarningMessage>
              )}
            {userInfos &&
              !roles.includes('User') &&
              roles.includes('Admin') && (
                <WarningMessage>
                  Le rôle d'admin doit être utilisé avec le rôle user.
                </WarningMessage>
              )}
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>fermer</Button>
        <LoadingStateButton loadingState={updateLoading} onClick={save}>
          Enregistrer
        </LoadingStateButton>
      </DialogActions>
    </Dialog>
  );
};

const WarningMessage = (props: PropsWithChildren) => (
  <div
    css={css`
      color: ${colors.white};
      background: ${colors.errorBackground};
      border: 1px solid ${colors.errorRed};
      border-radius: 4px;
      margin: 10px 0;
      padding: 10px;
      display: flex;
    `}
  >
    <WarningIcon
      css={css`
        margin-right: 20px;
      `}
    />
    <Typography>{props.children}</Typography>
  </div>
);
