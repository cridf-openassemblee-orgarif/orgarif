/** @jsxImportSource @emotion/react */
import { ClientUid } from '../../domain/client-ids';
import { PlainStringPassword } from '../../generated/domain/security';
import { asNominalString } from '../../utils/nominal-class';
import { ControlledPasswordInput } from '../common/form/ControlledPasswordInput';
import { css } from '@emotion/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export interface PasswordFormInput {
  password: PlainStringPassword;
}

export interface PasswordFormRawInput {
  password: string;
}

export const PasswordForm = (props: {
  formId: ClientUid;
  onSubmit: (dto: PasswordFormInput) => Promise<void>;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<PasswordFormRawInput>();
  return (
    <form
      id={props.formId}
      onSubmit={handleSubmit(input =>
        props.onSubmit({
          password: asNominalString(input.password)
        })
      )}
    >
      <div
        css={css`
          margin: 10px 0;
        `}
      >
        <ControlledPasswordInput
          name="password"
          label="Nouveau mot de passe"
          control={control}
          errors={errors}
        />
      </div>
    </form>
  );
};
