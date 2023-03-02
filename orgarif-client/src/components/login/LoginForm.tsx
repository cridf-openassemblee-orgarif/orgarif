/** @jsxImportSource @emotion/react */
import { PlainStringPassword } from '../../generated/domain/security';
import { LoadingState } from '../../interfaces';
import { asNominalString } from '../../utils/nominal-class';
import { LoadingStateButton } from '../common/LoadingButton';
import { ControlledPasswordInput } from '../common/form/ControlledPasswordInput';
import { ControlledTextInput } from '../common/form/ControlledTextInput';
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
  const [loading, setLoading] = useState<LoadingState>('Idle');
  return (
    <form
      onSubmit={handleSubmit(input => {
        setLoading('Loading');
        props
          .onSubmit({
            mail: input.mail,
            password: asNominalString(input.password)
          })
          .then(() => setLoading('Idle'))
          .catch(() => setLoading('Error'));
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
