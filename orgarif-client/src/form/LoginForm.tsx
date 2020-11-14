/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { PasswordInput } from '../component/base-component/PasswordInput';
import { SimpleForm } from '../component/base-component/SimpleForm';
import { TextInput } from '../component/base-component/TextInput';

export interface LoginFormDto {
  login: string;
  password: string;
}

interface Props {
  onSubmit: (dto: LoginFormDto) => void;
}

export const LoginForm = (props: Props) => {
  const [password, setPassword] = useState('');
  return (
    <SimpleForm
      onSubmit={(dto: { login: string }) =>
        props.onSubmit({
          login: dto.login,
          password
        })
      }
    >
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <TextInput name={'login'} label={'E-mail'} />
      </div>
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <PasswordInput
          label="Mot de passe"
          value={password}
          setValue={setPassword}
        />
      </div>
      <Button type="submit">Se connecter</Button>
    </SimpleForm>
  );
};
