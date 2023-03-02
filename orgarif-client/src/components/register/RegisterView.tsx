/** @jsxImportSource @emotion/react */
import { Errors } from '../../errors';
import { RegisterCommandResponse } from '../../generated/command/commands';
import { RegisterResult } from '../../generated/domain/user';
import { appContext } from '../../services/ApplicationContext';
import { state } from '../../state/state';
import { assertUnreachable } from '../../utils';
import { MainContainer } from '../containers/MainContainer';
import { RegisterForm, RegisterFormInput } from './RegisterForm';
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
<<<<<<< HEAD:orgarif-client/src/view/RegisterView.tsx
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { RegisterCommand } from '../domain/commands';
import { RegisterResult } from '../domain/user';
import { Errors } from '../errors';
import { RegisterForm, RegisterFormDto } from '../form/RegisterForm';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { assertUnreachable } from '../utils';
=======
>>>>>>> template:orgarif-client/src/components/register/RegisterView.tsx

export const RegisterView = () => {
  const [userInfos, setUserInfos] = useRecoilState(state.userInfos);
  const [registerResult, setRegisterResult] = useState<RegisterResult>();
  const register = (input: RegisterFormInput) =>
    appContext
      .commandService()
      .send<RegisterCommandResponse>({
        objectType: 'RegisterCommand',
        ...input
      })
      .then(r => {
        switch (r.result) {
          case 'Registered':
            if (!r.userinfos) {
              throw Errors._db434940();
            }
            appContext.csrfTokenService().refreshToken();
            setUserInfos(r.userinfos);
            break;
          case 'MailAlreadyExists':
            break;
          default:
            assertUnreachable(r.result);
        }
        setRegisterResult(r.result);
      });
  return (
    <MainContainer>
      <div
        css={css`
          display: flex;
          justify-content: center;
          padding-top: 70px;
        `}
      >
        <div>
          <h1
            css={css`
              text-align: center;
            `}
          >
            Inscription
          </h1>
          <div
            css={css`
              width: 400px;
            `}
          >
            {registerResult !== 'Registered' && !userInfos && (
              <RegisterForm
                onSubmit={register}
                mailIsAlreadyTaken={registerResult === 'MailAlreadyExists'}
              />
            )}
            {userInfos && (
              <div
                css={css`
                  text-align: center;
                `}
              >
                Vous êtes connecté
                <br />
                <RouteLink
                  route={{
                    name: 'EditListOrganismesRoute'
                  }}
                >
                  Liste des organismes
                </RouteLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainContainer>
  );
};
