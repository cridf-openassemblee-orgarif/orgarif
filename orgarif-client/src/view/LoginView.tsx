/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { LoginResult } from '../domain/user';
import { Errors } from '../errors';
import { LoginForm, LoginFormDto } from '../form/LoginForm';
import { state } from '../state/state';
import { assertUnreachable } from '../utils';

export const LoginView = () => {
  const [_, setUserInfos] = useRecoilState(state.userInfos);
  const [loginResult, setLoginResult] = useState<LoginResult | undefined>(
    undefined
  );
  const login = (data: LoginFormDto) => {
    appContext
      .commandService()
      .loginCommand(data)
      .then((r) => {
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
      <h1>Login view</h1>
      <LoginForm onSubmit={login} />
      {loginResult}
    </MainContainer>
  );
};
