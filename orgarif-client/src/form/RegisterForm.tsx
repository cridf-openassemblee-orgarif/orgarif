/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { appContext } from '../ApplicationContext';
import { useForm } from 'react-hook-form';
import { ControlledTextInput } from '../component/base-component/ControlledTextInput';
import { colors } from '../styles/vars';
import { ControlledPasswordInput } from '../component/base-component/ControlledPasswordInput';
import { PlainStringPassword } from '../generated/domain/security';
import { asNominalString } from '../utils/nominal-class';
import { LoadingState } from '../interfaces';
import { LoadingStateButton } from '../component/base-component/LoadingButton';
import { IsMailAlreadyTakenQueryResponse } from '../generated/query/queries';

export interface RegisterFormInput {
  mail: string;
  password: PlainStringPassword;
  displayName: string;
}

export interface RegisterFormRawInput {
  mail: string;
  password: string;
  displayName: string;
}

export const RegisterForm = (props: {
  onSubmit: (dto: RegisterFormInput) => Promise<void>;
  mailIsAlreadyTaken: boolean;
}) => {
  const [mailIsAlreadyTaken, setMailIsAlreadyTaken] = useState(false);
  const checkMailAvailability = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const mail = event.target.value;
    appContext
      .queryService()
      .send<IsMailAlreadyTakenQueryResponse>({
        objectType: 'IsMailAlreadyTakenQuery',
        mail
      })
      .then(r => {
        setMailIsAlreadyTaken(r.alreadyTaken);
      });
  };
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterFormRawInput>();
  const [loading, setLoading] = useState<LoadingState>('Idle');
  return (
    <form
      onSubmit={handleSubmit(input => {
        setLoading('Loading');
        props
          .onSubmit({
            mail: input.mail,
            password: asNominalString(input.password),
            displayName: input.displayName
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
          onChange={checkMailAvailability}
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
          Email is already taken
        </div>
      )}
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
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <ControlledTextInput
          name="displayName"
          label="Display name"
          control={control}
          errors={errors}
        />
      </div>
      <LoadingStateButton loadingState={loading} type="submit">
        Register
      </LoadingStateButton>
    </form>
  );
};
