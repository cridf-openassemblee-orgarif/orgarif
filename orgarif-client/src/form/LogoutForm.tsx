/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { appContext } from '../ApplicationContext';
import { LoadingStateButton } from '../component/base-component/LoadingButton';
import { SignOut } from '../icon/collection/SignOut';
import { LoadingState } from '../interfaces';
import { colors } from '../styles/colors';

const logoutPath = '/logout';

export const LogoutForm = () => {
  const [loading, setLoading] = useState<LoadingState>('idle');
  return (
    <form
      method="post"
      action={logoutPath}
      onSubmit={() => setLoading('loading')}
    >
      <input
        type="hidden"
        name={appContext.csrfTokenService().inputName}
        value={appContext.csrfTokenService().token}
      />
      <SignOut size={36} />
      <LoadingStateButton
        loadingState={loading}
        type="submit"
        variant="text"
        css={css`
          color: ${colors.dark};
          padding-right: 1em;
          text-transform: capitalize;
        `}
      >
        Déconnexion
      </LoadingStateButton>
    </form>
  );
};
