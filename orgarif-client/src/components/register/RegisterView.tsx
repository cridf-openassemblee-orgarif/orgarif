/** @jsxImportSource @emotion/react */
import { Errors } from '../../errors';
import { RegisterCommandResponse } from '../../generated/command/Commands.generated';
import { RegisterResult } from '../../generated/domain/User.generated';
import { appContext } from '../../services/ApplicationContext';
import { state } from '../../state/state';
import { assertUnreachable } from '../../utils';
import { MainContainer } from '../containers/MainContainer';
import { RegisterForm, RegisterFormInput } from './RegisterForm';
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export const RegisterView = () => {
  const [userInfos, setUserInfos] = useRecoilState(state.userInfos);
  const [registerResult, setRegisterResult] = useState<RegisterResult>();
  const register = (input: RegisterFormInput) =>
    appContext.commandService
      .send<RegisterCommandResponse>({
        objectType: 'RegisterCommand',
        ...input
      })
      .then(r => {
        switch (r.result) {
          case 'Registered':
            if (!r.userInfos) {
              throw Errors._db434940();
            }
            setUserInfos(r.userInfos);
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
            Inscription
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
                Vous êtes connecté
              </div>
            )}
          </div>
        </div>
      </div>
    </MainContainer>
  );
};
