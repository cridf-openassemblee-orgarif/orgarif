/** @jsxImportSource @emotion/react */
import { Errors } from '../../errors';
import {
  DevLoginCommandResponse,
  LoginCommandResponse
} from '../../generated/command/Commands';
import { LoginResult, UserInfos } from '../../generated/domain/User';
import { appContext } from '../../services/ApplicationContext';
import { state } from '../../state/state';
import { assertUnreachable } from '../../utils';
import { space } from '../common/component-utils';
import { MainContainer } from '../containers/MainContainer';
import { useGoTo } from '../routing/routing-utils';
import { LoginForm, LoginFormInput } from './LoginForm';
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export const LoginView = () => {
  const [userInfos, setUserInfos] = useRecoilState(state.userInfos);
  const [loginResult, setLoginResult] = useState<LoginResult>();
  const goTo = useGoTo();
  const connect = (userInfos: UserInfos) => {
    setUserInfos(userInfos);
    goTo(
      { name: 'RootRoute' },
      {
        useTargetPath: true
      }
    );
  };
  const login = (input: LoginFormInput) =>
    appContext.commandService
      .send<LoginCommandResponse>({
        objectType: 'LoginCommand',
        ...input
      })
      .then(r => {
        setLoginResult(r.result);
        switch (r.result) {
          case 'LoggedIn':
            if (!r.userInfos) {
              throw Errors._198c103e();
            }
            connect(r.userInfos);
            break;
          case 'MailNotFound':
          case 'BadPassword':
            break;
          default:
            assertUnreachable(r.result);
        }
      });
  const devLogin = (username: string) =>
    appContext.commandService
      .send<DevLoginCommandResponse>({
        objectType: 'DevLoginCommand',
        username
      })
      .then(r => connect(r.userInfos));
  return (
    <MainContainer>
      <div
        css={css`
          margin: auto;
          max-width: 400px;
        `}
      >
        <h1
          css={css`
            text-align: center;
          `}
        >
          Login
        </h1>
        <div>
          {loginResult !== 'LoggedIn' && !userInfos && (
            <LoginForm onSubmit={login} />
          )}
          {!userInfos && bootstrapData.env === 'Dev' && (
            <div
              css={css`
                margin-top: 20px;
              `}
            >
              dev user authent :{space}
              <Button onClick={() => devLogin('user')}>user</Button>
              <Button onClick={() => devLogin('admin')}>admin</Button>
            </div>
          )}
          {userInfos && (
            <div
              css={css`
                text-align: center;
              `}
            >
              You're logged in
            </div>
          )}
          {loginResult && (
            <div
              css={css`
                text-align: center;
                margin-top: 20px;
              `}
            >
              {(() => {
                switch (loginResult) {
                  case 'LoggedIn':
                    return null;
                  case 'MailNotFound':
                    return <div>User not found</div>;
                  case 'BadPassword':
                    return <div>Bad password</div>;
                  default:
                    assertUnreachable(loginResult);
                }
              })()}
            </div>
          )}
        </div>
      </div>
    </MainContainer>
  );
};
