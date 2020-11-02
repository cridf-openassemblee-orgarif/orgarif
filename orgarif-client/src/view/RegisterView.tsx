/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { RegisterResult } from '../domain/user';
import { Errors } from '../errors';
import { RegisterForm, RegisterFormDto } from '../form/RegisterForm';
import { assertUnreachable } from '../utils';
import set = Reflect.set;

export const RegisterView = () => {
  const [registerResult, setRegisterResult] = useState<
    RegisterResult | undefined
  >(undefined);
  const register = (registerInput: RegisterFormDto) => {
    appContext
      .commandService()
      .registerCommand(registerInput)
      .then((r) => {
        setRegisterResult(r.result);
        switch (r.result) {
          case 'REGISTERED':
            if (!r.userinfos) {
              throw Errors._db434940();
            }
            appContext.csrfTokenService().refreshToken();
            // setUserInfos(r.userinfos);
            break;
          case 'MAIL_ALREADY_EXISTS':
            break;
          default:
            assertUnreachable(r.result);
        }
      });
  };

  return (
    <MainContainer>
      <h1>RegisterView</h1>
      <RegisterForm onSubmit={register} />
      {registerResult}
    </MainContainer>
  );
};
