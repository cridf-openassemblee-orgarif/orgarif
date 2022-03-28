/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { useForm } from 'react-hook-form';
import { ControlledTextInput } from '../component/base-component/ControlledTextInput';
import { colors } from '../styles/colors';
import { ControlledPasswordInput } from '../component/base-component/ControlledPasswordInput';

export interface RegisterFormDto {
  mail: string;
  password: string;
  displayName: string;
}

export const RegisterForm = (props: {
  onSubmit: (dto: RegisterFormDto) => void;
  mailIsAlreadyTaken: boolean;
}) => {
  const [mailIsAlreadyTaken, setMailIsAlreadyTaken] = useState(false);
  const checkLoginAvailability = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const login = event.target.value;
    appContext
      .queryService()
      .isLoginAlreadyTakenQuery({ login })
      .then(r => {
        setMailIsAlreadyTaken(r.alreadyTaken);
      });
  };
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterFormDto>();
  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <ControlledTextInput
          name="mail"
          label="E-mail"
          onChange={checkLoginAvailability}
          control={control}
          errors={errors}
        />
      </div>
      {(mailIsAlreadyTaken || props.mailIsAlreadyTaken) && (
        <div
          css={css`
            margin: 10px 0;
            color: ${colors.errorRed};
            font-weight: bold;
          `}
        >
          Il existe déjà un compte avec cet email
        </div>
      )}
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <ControlledPasswordInput
          name="password"
          label="Mode de passe"
          control={control}
          errors={errors}
        />
      </div>
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <ControlledTextInput
          name="displayName"
          label="Nom affiché"
          control={control}
          errors={errors}
        />
      </div>
      <Button type="submit">Créer le compte</Button>
    </form>
  );
};
