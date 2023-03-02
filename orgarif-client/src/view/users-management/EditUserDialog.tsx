/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { css } from '@emotion/react';
import { UserId } from '../../generated/domain/fmk-ids';
import { UserInfos } from '../../generated/domain/user';
import { GetUserInfosQueryResponse } from '../../generated/query/queries';
import { LoadingState } from '../../interfaces';
import { appContext } from '../../ApplicationContext';

export const EditUserDialog = (props: {
  close: () => void;
  userId: UserId | undefined;
  // TODO call when update userInfos
  updateUserInfos: (user: UserInfos) => void;
}) => {
  const [userInfos, setUserInfos] = useState<UserInfos>();
  const [loading, setLoading] = useState<LoadingState>('Idle');
  useEffect(() => {
    if (props.userId) {
      // keep after if (props.userId) for dialog disappearing animation
      setUserInfos(undefined);
      setLoading('Loading');
      appContext
        .queryService()
        .send<GetUserInfosQueryResponse>({
          objectType: 'GetUserInfosQuery',
          userId: props.userId
        })
        .then(r => {
          setLoading('Idle');
          setUserInfos(r.userInfos);
        });
    }
  }, [props.userId]);
  const displayLoaderInHeader = userInfos && loading === 'Loading';
  const displayLoaderInBody = !userInfos && loading === 'Loading';
  return (
    <Dialog
      open={!!props.userId}
      onClose={props.close}
      maxWidth={'lg'}
      fullWidth={true}
      scroll="body"
    >
      <DialogTitle>
        Edit user
        {displayLoaderInHeader && (
          <span
            css={css`
              padding-left: 16px;
              top: 2px;
            `}
          >
            <CircularProgress size={20} />
          </span>
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {displayLoaderInBody && (
            <div
              css={css`
                text-align: center;
              `}
            >
              <CircularProgress size={18} />
            </div>
          )}
          {userInfos && <pre>{JSON.stringify(userInfos, null, 2)}</pre>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.close()}>fermer</Button>
      </DialogActions>
    </Dialog>
  );
};
