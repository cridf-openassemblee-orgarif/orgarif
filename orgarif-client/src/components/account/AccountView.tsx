/** @jsxImportSource @emotion/react */
import { appContext } from '../../services/ApplicationContext';
import { MainContainer } from '../containers/MainContainer';
import { PasswordFormInput } from './PasswordForm';
import { UpdatePasswordDialogButton } from './UpdatePasswordDialogButton';
import { css } from '@emotion/react';
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
      <div
        css={css`
          margin: 20px;
          text-align: center;
        `}
      >
        <UpdatePasswordDialogButton onSubmit={onSubmit} />
      </div>
    </MainContainer>
  );
};
