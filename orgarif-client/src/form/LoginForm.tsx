/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledTextInput } from '../component/base-component/ControlledTextInput';
import { ControlledPasswordInput } from '../component/base-component/ControlledPasswordInput';
import { LoadingStateButton } from '../component/base-component/LoadingButton';
import { LoadingState } from '../interfaces';

export interface LoginFormDto {
  login: string;
  password: string;
}

export const LoginForm = (props: {
  onSubmit: (dto: LoginFormDto) => Promise<void>;
}) => {
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
          label="Email"
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
          label="Password"
          control={control}
          errors={errors}
        />
      </div>
      <LoadingStateButton loadingState={loading}>Login</LoadingStateButton>
    </form>
  );
};
