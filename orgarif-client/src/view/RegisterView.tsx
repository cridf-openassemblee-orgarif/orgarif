/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { RegisterCommand } from '../domain/commands';
import { RegisterResult } from '../domain/user';
import { Errors } from '../errors';
import { RegisterForm, RegisterFormDto } from '../form/RegisterForm';
import { state } from '../state/state';
import { assertUnreachable } from '../utils';

export const RegisterView = () => {
  const [userInfos, setUserInfos] = useRecoilState(state.userInfos);
  const [registerResult, setRegisterResult] = useState<RegisterResult>();
  const register = (registerInput: RegisterFormDto) => {
    const registerCommand: RegisterCommand = registerInput;
    appContext
      .commandService()
      .registerCommand(registerCommand)
      .then(r => {
        switch (r.result) {
          case 'registered':
            if (!r.userinfos) {
              throw Errors._db434940();
            }
            appContext.csrfTokenService().refreshToken();
            setUserInfos(r.userinfos);
            break;
          case 'mailAlreadyExists':
            break;
          default:
            assertUnreachable(r.result);
        }
        setRegisterResult(r.result);
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
            Register
          </h1>
          <div
            css={css`
              width: 400px;
            `}
          >
            {registerResult !== 'registered' && !userInfos && (
              <RegisterForm
                onSubmit={register}
                mailIsAlreadyTaken={registerResult === 'mailAlreadyExists'}
              />
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
          </div>
        </div>
      </div>
    </MainContainer>
  );
};
