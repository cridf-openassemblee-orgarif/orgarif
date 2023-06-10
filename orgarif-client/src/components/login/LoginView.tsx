/** @jsxImportSource @emotion/react */
import { Errors } from '../../errors';
import {
  DevLoginCommandResponse,
  LoginCommandResponse
} from '../../generated/command/commands';
import { LoginResult, UserInfos } from '../../generated/domain/user';
import { appContext } from '../../services/ApplicationContext';
import { state } from '../../state/state';
import { assertUnreachable } from '../../utils';
import { space } from '../common/component-utils';
import { RouteLink } from '../routing/RouteLink';
import { LoginForm, LoginFormInput } from './LoginForm';
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export const LoginView = () => {
  const [userInfos, setUserInfos] = useRecoilState(state.userInfos);
  const [loginResult, setLoginResult] = useState<LoginResult>();
  const connect = (userInfos: UserInfos) => {
    setUserInfos(userInfos);
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
    <>
      <div
        css={css`
          display: flex;
          justify-content: center;
          padding: 2em;
        `}
      >
        <div>
          <h1
            css={css`
              text-align: center;
            `}
          >
            Identification
          </h1>
          <div
            css={css`
              min-width: 90vw;
              max-width: 90vw;
              @media (min-width: 768px) {
                min-width: 400px;
                max-width: 400px;
              }
              padding: 0 20px;
            `}
          >
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
                Vous êtes connecté
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
                      return <div>Utilisateur non trouvé</div>;
                    case 'BadPassword':
                      return <div>Mauvais mot de passe</div>;
                    default:
                      assertUnreachable(loginResult);
                  }
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
