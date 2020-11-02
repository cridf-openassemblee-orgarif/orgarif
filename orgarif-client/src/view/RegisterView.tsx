/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { RegisterResult } from '../domain/user';
import { RegisterForm, RegisterFormDto } from '../form/RegisterForm';
import set = Reflect.set;

export const RegisterView = () => {
  const [registerResult, setRegisterResult] = useState<
    RegisterResult | undefined
  >(undefined);
  const register = (registerInput: RegisterFormDto) => {
    appContext
      .actions()
      .register(registerInput)
      .then((result) => setRegisterResult(result));
  };
  return (
    <MainContainer>
      <h1>RegisterView</h1>
      <RegisterForm onSubmit={register} />
      {registerResult}
    </MainContainer>
  );
};
