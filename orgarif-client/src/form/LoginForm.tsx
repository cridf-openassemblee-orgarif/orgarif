/** @jsx jsx */
import { jsx } from '@emotion/core';
import { SimpleForm } from '../component/SimpleForm';

export interface LoginFormDto {
  login: string;
  password: string;
}

interface Props {
  onSubmit: (dto: LoginFormDto) => void;
}

export const LoginForm = (props: Props) => (
  <SimpleForm onSubmit={props.onSubmit}>
    <label>
      Login (e-mail or username) :
      <input name="login" />
    </label>
    <label>
      Password :
      <input name="password" />
    </label>
    <input type="submit" />
  </SimpleForm>
);
