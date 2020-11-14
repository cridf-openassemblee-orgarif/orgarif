/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { appContext } from '../ApplicationContext';
import { MainContainer } from '../container/MainContainer';
import { RegisterCommand } from '../domain/command';
import { RegisterResult } from '../domain/user';
import { Errors } from '../errors';
import { RegisterForm, RegisterFormDto } from '../form/RegisterForm';
import { RouteLink } from '../routing/RouteLink';
import { state } from '../state/state';
import { assertUnreachable } from '../utils';

export const RegisterView = () => {
  const [userInfos, setUserInfos] = useRecoilState(state.userInfos);
  const [registerResult, setRegisterResult] = useState<
    RegisterResult | undefined
  >(undefined);
  const register = (registerInput: RegisterFormDto) => {
    const registerCommand: RegisterCommand = registerInput;
    appContext
      .commandService()
      .registerCommand(registerCommand)
      .then((r) => {
        switch (r.result) {
          case 'REGISTERED':
            if (!r.userinfos) {
              throw Errors._db434940();
            }
            appContext.csrfTokenService().refreshToken();
            setUserInfos(r.userinfos);
            break;
          case 'MAIL_ALREADY_EXISTS':
            break;
          default:
            assertUnreachable(r.result);
        }
        setRegisterResult(r.result);
      });
  };
  return (
    <MainContainer>
      <div
        css={css`
          display: flex;
          justify-content: center;
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
            {registerResult !== 'REGISTERED' && !userInfos && (
              <RegisterForm onSubmit={register} />
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
                    name: 'ListOrganismesRoute',
                  }}
                >
                  Liste des organismes
                </RouteLink>
              </div>
            )}
            {registerResult === 'MAIL_ALREADY_EXISTS' && (
              <div
                css={css`
                  text-align: center;
                `}
              >
                Il existe déjà un compte avec cet email
              </div>
            )}
          </div>
        </div>
      </div>
    </MainContainer>
  );
};
