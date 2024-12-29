/** @jsxImportSource @emotion/react */
import { PlainStringPassword } from '../../generated/domain/Security';
import { IsMailAlreadyTakenQueryResponse } from '../../generated/query/Queries';
import { LoadingState } from '../../interfaces';
import { appContext } from '../../services/ApplicationContext';
import { nominal } from '../../utils/nominal-class';
import { LoadingStateButton } from '../common/LoadingButton';
import { ControlledPasswordInput } from '../common/form/ControlledPasswordInput';
import { ControlledTextInput } from '../common/form/ControlledTextInput';
import { colors } from '../styles/colors';
import { css } from '@emotion/react';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

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
    appContext.queryService
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
            password: nominal(input.password),
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
          label="E-mail"
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
      <LoadingStateButton loadingState={loading} type="submit">
        Créer le compte
      </LoadingStateButton>
    </form>
  );
};
