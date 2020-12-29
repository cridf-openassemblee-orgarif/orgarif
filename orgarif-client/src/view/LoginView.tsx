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
  const [loginResult, setLoginResult] = useState<LoginResult | undefined>(
    undefined
  );
  const login = (data: LoginFormDto) => {
    appContext
      .commandService()
      .loginCommand(data)
      .then(r => {
        setLoginResult(r.result);
        switch (r.result) {
          case 'LOGGED_IN':
            if (!r.userinfos) {
              throw Errors._198c103e();
            }
            appContext.csrfTokenService().refreshToken();
            setUserInfos(r.userinfos);
            break;
          case 'USER_NOT_FOUND':
          case 'BAD_PASSWORD':
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
            {loginResult !== 'LOGGED_IN' && !userInfos && (
              <LoginForm onSubmit={login} />
            )}
            {!userInfos && applicationBootstrapData.env === 'dev' && (
              <div
                css={css`
                  margin-top: 20px;
                `}
              >
                dev authent :{' '}
                <Button
                  onClick={() =>
                    login({
                      login: 'dev',
                      password: 'dev'
                    })
                  }
                >
                  dev
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
                    case 'LOGGED_IN':
                      return null;
                    case 'USER_NOT_FOUND':
                      return <div>Utilisateur non trouvé</div>;
                    case 'BAD_PASSWORD':
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
