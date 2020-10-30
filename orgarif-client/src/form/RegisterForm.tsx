/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ChangeEvent } from 'react';
import { SimpleForm } from '../component/SimpleForm';

export interface RegisterFormDto {
  mail: string;
  password: string;
  displayName: string;
}

interface Props {
  onMailChange: (mail: string) => void;
  displayMailIsAlreadyTaken: boolean;
  onSubmit: (dto: RegisterFormDto) => void;
}

export const RegisterForm = (props: Props) => {
  const mailOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.onMailChange(event.target.value);
  return (
    <SimpleForm onSubmit={props.onSubmit}>
      <label>
        Email :
        <input name="mail" onChange={mailOnChange} />
      </label>
      {props.displayMailIsAlreadyTaken && <div>Email is already taken</div>}
      <label>
        Password :
        <input name="password" />
      </label>
      <label>
        Display name :
        <input name="displayName" />
      </label>
      <input type="submit" />
    </SimpleForm>
  );
};
