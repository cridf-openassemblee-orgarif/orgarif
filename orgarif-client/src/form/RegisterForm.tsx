/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Button } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { PasswordInput } from '../component/base-component/PasswordInput';
import { SimpleForm } from '../component/base-component/SimpleForm';
import { TextInput } from '../component/base-component/TextInput';

export interface RegisterFormDto {
  mail: string;
  password: string;
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
      onSubmit={(dto: { mail: string }) =>
        props.onSubmit({
          mail: dto.mail,
          password
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
          label={'E-mail'}
          onChange={checkLoginAvailability}
        />
      </div>
      {mailIsAlreadyTaken && (
        <div
          css={css`
            margin: 10px 0;
          `}
        >
          L'e-mail est déjà pris
        </div>
      )}
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <PasswordInput
          label="Mode de passe"
          value={password}
          setValue={setPassword}
        />
      </div>
      <Button type="submit">Créer le compte</Button>
    </SimpleForm>
  );
};
