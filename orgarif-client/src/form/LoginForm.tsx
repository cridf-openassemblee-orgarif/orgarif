/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledTextInput } from '../component/base-component/ControlledTextInput';
import { ControlledPasswordInput } from '../component/base-component/ControlledPasswordInput';
import { FormLoadingButton } from '../component/base-component/LoadingButton';
import { LoadingState } from '../interfaces';

export interface LoginFormDto {
  login: string;
  password: string;
}

interface Props {
  onSubmit: (dto: LoginFormDto) => Promise<void>;
}

export const LoginForm = (props: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<LoginFormDto>();
  const [loading, setLoading] = useState<LoadingState>('idle');
  return (
    <form
      onSubmit={handleSubmit(dto => {
        setLoading('loading');
        props
          .onSubmit(dto)
          .then(() => setLoading('idle'))
          .catch(() => setLoading('error'));
      })}
    >
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <ControlledTextInput
          name="login"
          label="E-mail"
          control={control}
          errors={errors}
        />
      </div>
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <ControlledPasswordInput
          name="password"
          label="Mot de passe"
          control={control}
          errors={errors}
        />
      </div>
      <FormLoadingButton loadingState={loading}>Se connecter</FormLoadingButton>
    </form>
  );
};
