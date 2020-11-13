/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { SimpleForm } from '../component/base-component/SimpleForm';

export interface RegisterFormDto {
  mail: string;
  password: string;
}

interface Props {
  onSubmit: (dto: RegisterFormDto) => void;
}

export const RegisterForm = (props: Props) => {
  const [login, setLogin] = useState('');
  const [mailIsAlreadyTaken, setMailIsAlreadyTaken] = useState(false);
  useEffect(() => {
    if (login !== '') {
      appContext
        .queryService()
        .isLoginAlreadyTakenQuery({ login })
        .then((r) => {
          setMailIsAlreadyTaken(r.alreadyTaken);
        });
    }
  }, [login]);
  const loginOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    setLogin(event.target.value);
  return (
    <SimpleForm onSubmit={props.onSubmit}>
      <label>
        Email :
        <input name="mail" onChange={loginOnChange} />
      </label>
      {mailIsAlreadyTaken && <div>Email is already taken</div>}
      <label>
        Password :
        <input name="password" />
      </label>
      <input type="submit" />
    </SimpleForm>
  );
};
