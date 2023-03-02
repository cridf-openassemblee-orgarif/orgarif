/** @jsxImportSource @emotion/react */
import { PlainStringPassword } from '../../generated/domain/security';
import { IsMailAlreadyTakenQueryResponse } from '../../generated/query/queries';
import { LoadingState } from '../../interfaces';
import { appContext } from '../../services/ApplicationContext';
import { asNominalString } from '../../utils/nominal-class';
import { LoadingStateButton } from '../common/LoadingButton';
import { ControlledPasswordInput } from '../common/form/ControlledPasswordInput';
import { ControlledTextInput } from '../common/form/ControlledTextInput';
import { colors } from '../styles/vars';
import { css } from '@emotion/react';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
<<<<<<< HEAD:orgarif-client/src/form/RegisterForm.tsx
import { ControlledTextInput } from '../component/base-component/ControlledTextInput';
import { colors } from '../styles/colors';
import { ControlledPasswordInput } from '../component/base-component/ControlledPasswordInput';
=======
>>>>>>> template:orgarif-client/src/components/register/RegisterForm.tsx

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
<<<<<<< HEAD:orgarif-client/src/form/RegisterForm.tsx
      <Button type="submit">Créer le compte</Button>
=======
      <LoadingStateButton loadingState={loading} type="submit">
        Register
      </LoadingStateButton>
>>>>>>> template:orgarif-client/src/components/register/RegisterForm.tsx
    </form>
  );
};
