/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledTextInput } from '../component/base-component/ControlledTextInput';
import { ControlledPasswordInput } from '../component/base-component/ControlledPasswordInput';
import { LoadingStateButton } from '../component/base-component/LoadingButton';
import { LoadingState } from '../interfaces';
import { PlainStringPassword } from '../generated/domain/security';
import { asNominalString } from '../utils/nominal-class';

export interface LoginFormInput {
  mail: string;
  password: PlainStringPassword;
}

export interface LoginFormRawInput {
  mail: string;
  password: string;
}

export const LoginForm = (props: {
  onSubmit: (dto: LoginFormInput) => Promise<void>;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<LoginFormRawInput>();
  const [loading, setLoading] = useState<LoadingState>('idle');
  return (
    <form
      onSubmit={handleSubmit(input => {
        setLoading('loading');
        props
          .onSubmit({
            mail: input.mail,
            password: asNominalString(input.password)
          })
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
          name="mail"
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
      <LoadingStateButton loadingState={loading} type="submit">
        Login
      </LoadingStateButton>
    </form>
  );
};
