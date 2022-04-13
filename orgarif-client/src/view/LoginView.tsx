/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { LoginResult, UserInfos } from '../domain/user';
import { LoginForm, LoginFormDto } from '../form/LoginForm';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { assertUnreachable } from '../utils';
import { Errors } from '../errors';
import { useGoTo } from '../routing/useGoTo';

export const LoginView = () => {
  const [userInfos, setUserInfos] = useRecoilState(state.userInfos);
  const [loginResult, setLoginResult] = useState<LoginResult>();
  const goTo = useGoTo();
  const connect = (userInfos: UserInfos) => {
    appContext.csrfTokenService().refreshToken();
    setUserInfos(userInfos);
    goTo(
      { name: 'RootRoute' },
      {
        useTargetPath: true
      }
    );
  };
  const login = (data: LoginFormDto) =>
    appContext
      .commandService()
      .loginCommand(data)
      .then(r => {
        setLoginResult(r.result);
        switch (r.result) {
          case 'loggedIn':
            if (!r.userinfos) {
              throw Errors._198c103e();
            }
            connect(r.userinfos);
            break;
          case 'mailNotFound':
          case 'badPassword':
            break;
          default:
            assertUnreachable(r.result);
        }
      });
  const devLogin = (username: string) =>
    appContext
      .commandService()
      .devLoginCommand({ username })
      .then(r => connect(r.userinfos));
  return (
    <MainContainer>
      <div
        css={css`
          display: flex;
          justify-content: center;
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
              width: 400px;
            `}
          >
            {loginResult !== 'loggedIn' && !userInfos && (
              <LoginForm onSubmit={login} />
            )}
            {!userInfos && bootstrapData.env === 'dev' && (
              <div
                css={css`
                  margin-top: 20px;
                `}
              >
                dev user authent :{' '}
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
                <br />
                <RouteLink
                  route={{
                    name: 'ListOrganismesRoute'
                  }}
                >
                  Liste des organismes
                </RouteLink>
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
                    case 'loggedIn':
                      return null;
                    case 'mailNotFound':
                      return <div>Utilisateur non trouvé</div>;
                    case 'badPassword':
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
    </MainContainer>
  );
};
