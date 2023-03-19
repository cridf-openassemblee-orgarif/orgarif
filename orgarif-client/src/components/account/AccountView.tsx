/** @jsxImportSource @emotion/react */
import { appContext } from '../../services/ApplicationContext';
import { MainContainer } from '../containers/MainContainer';
import { PasswordFormInput } from './PasswordForm';
import { UpdatePasswordDialogButton } from './UpdatePasswordDialogButton';
import * as React from 'react';
import {css} from "@emotion/react";

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
