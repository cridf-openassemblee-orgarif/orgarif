/** @jsxImportSource @emotion/react */
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { Errors } from '../errors';
import { RegisterForm, RegisterFormInput } from '../form/RegisterForm';
import { RegisterCommandResponse } from '../generated/command/commands';
import { RegisterResult } from '../generated/domain/user';
import { state } from '../state/state';
import { assertUnreachable } from '../utils';
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export const RegisterView = () => {
  const [userInfos, setUserInfos] = useRecoilState(state.userInfos);
  const [registerResult, setRegisterResult] = useState<RegisterResult>();
  const register = (input: RegisterFormInput) =>
    appContext
      .commandService()
      .send<RegisterCommandResponse>({
        objectType: 'RegisterCommand',
        ...input
      })
      .then(r => {
        switch (r.result) {
          case 'Registered':
            if (!r.userinfos) {
              throw Errors._db434940();
            }
            appContext.csrfTokenService().refreshToken();
            setUserInfos(r.userinfos);
            break;
          case 'MailAlreadyExists':
            break;
          default:
            assertUnreachable(r.result);
        }
        setRegisterResult(r.result);
      });
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
            {registerResult !== 'Registered' && !userInfos && (
              <RegisterForm
                onSubmit={register}
                mailIsAlreadyTaken={registerResult === 'MailAlreadyExists'}
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
