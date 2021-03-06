/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@material-ui/core/Button';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { applicationBootstrapData } from '../constants';
import { MainContainer } from '../container/MainContainer';
import { LoginResult } from '../domain/user';
import { Errors } from '../errors';
import { LoginForm, LoginFormDto } from '../form/LoginForm';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { assertUnreachable } from '../utils';

export const LoginView = () => {
  const [userInfos, setUserInfos] = useRecoilState(state.userInfos);
  const [loginResult, setLoginResult] =
    useState<LoginResult | undefined>(undefined);
  const login = (data: LoginFormDto) => {
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
            appContext.csrfTokenService().refreshToken();
            setUserInfos(r.userinfos);
            appContext.applicationHistory().goTo({ name: 'RootRoute' });
            break;
          case 'userNotFound':
          case 'badPassword':
            break;
          default:
            assertUnreachable(r.result);
        }
      });
  };
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
            {!userInfos && applicationBootstrapData.env === 'dev' && (
              <div
                css={css`
                  margin-top: 20px;
                `}
              >
                dev user authent :{' '}
                <Button
                  onClick={() =>
                    login({
                      login: 'user',
                      password: 'user'
                    })
                  }
                >
                  user
                </Button>
                <Button
                  onClick={() =>
                    login({
                      login: 'admin',
                      password: 'admin'
                    })
                  }
                >
                  admin
                </Button>
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
                    case 'userNotFound':
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
