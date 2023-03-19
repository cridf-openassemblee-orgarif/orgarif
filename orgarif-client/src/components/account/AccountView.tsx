/** @jsxImportSource @emotion/react */
import { appContext } from '../../services/ApplicationContext';
import { MainContainer } from '../containers/MainContainer';
import { PasswordFormInput } from './PasswordForm';
import { UpdatePasswordDialogButton } from './UpdatePasswordDialogButton';
import * as React from 'react';

export const AccountView = () => {
  const onSubmit = (dto: PasswordFormInput) =>
    appContext
      .commandService()
      .send({
        objectType: 'UpdatePasswordCommand',
        password: dto.password
      })
      .then(() => {});
  return (
    <MainContainer>
      <UpdatePasswordDialogButton onSubmit={onSubmit} />
    </MainContainer>
  );
};
