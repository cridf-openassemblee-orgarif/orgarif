/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { RegisterCommand } from '../domain/command';
import { RegisterResult } from '../domain/user';
import { Errors } from '../errors';
import { RegisterForm, RegisterFormDto } from '../form/RegisterForm';
import { state } from '../state/state';
import { assertUnreachable } from '../utils';

export const RegisterView = () => {
  const [_, setUserInfos] = useRecoilState(state.userInfos);
  const [registerResult, setRegisterResult] = useState<
    RegisterResult | undefined
  >(undefined);
  const register = (registerInput: RegisterFormDto) => {
    const registerCommand: RegisterCommand = {
      ...registerInput,
    };
    appContext
      .commandService()
      .registerCommand(registerCommand)
      .then((r) => {
        setRegisterResult(r.result);
        switch (r.result) {
          case 'REGISTERED':
            if (!r.userinfos) {
              throw Errors._db434940();
            }
            appContext.csrfTokenService().refreshToken();
            setUserInfos(r.userinfos);
            break;
          case 'MAIL_ALREADY_EXISTS':
            break;
          default:
            assertUnreachable(r.result);
        }
      });
  };
  const [mailIsAlreadyTaken, setMailIsAlreadyTaken] = useState(false);
  const checkLoginAvailability = (login: string) => {
    appContext
      .queryService()
      .isLoginAlreadyTakenQuery({ login })
      .then((r) => {
        setMailIsAlreadyTaken(r.alreadyTaken);
      });
  };
  return (
    <MainContainer>
      <h1>RegisterView</h1>
      <RegisterForm
        onSubmit={register}
        onMailChange={checkLoginAvailability}
        displayMailIsAlreadyTaken={mailIsAlreadyTaken}
      />
      {registerResult}
    </MainContainer>
  );
};
