/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { PasswordInput } from '../component/base-component/PasswordInput';
import { SimpleForm } from '../component/base-component/SimpleForm';
import { TextInput } from '../component/base-component/TextInput';

export interface RegisterFormDto {
  mail: string;
  password: string;
  displayName: string;
}

interface Props {
  onSubmit: (dto: RegisterFormDto) => void;
}

export const RegisterForm = (props: Props) => {
  const [mailIsAlreadyTaken, setMailIsAlreadyTaken] = useState(false);
  const [password, setPassword] = useState('');
  const checkLoginAvailability = (event: ChangeEvent<HTMLInputElement>) => {
    const login = event.target.value;
    appContext
      .queryService()
      .isLoginAlreadyTakenQuery({ login })
      .then(r => {
        setMailIsAlreadyTaken(r.alreadyTaken);
      });
  };
  return (
    <SimpleForm
      onSubmit={(dto: { mail: string; displayName: string }) =>
        props.onSubmit({
          mail: dto.mail,
          password,
          displayName: dto.displayName
        })
      }
    >
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <TextInput
          name="mail"
          label={'Email'}
          onChange={checkLoginAvailability}
        />
      </div>
      {mailIsAlreadyTaken && (
        <div
          css={css`
            margin: 10px 0;
          `}
        >
          Email is already taken
        </div>
      )}
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <PasswordInput
          label="Password"
          value={password}
          setValue={setPassword}
        />
      </div>
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <TextInput
          name="displayName"
          label={'Display name'}
          onChange={checkLoginAvailability}
        />
      </div>
      <Button type="submit">Register</Button>
    </SimpleForm>
  );
};
