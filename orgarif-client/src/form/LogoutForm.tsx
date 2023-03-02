/** @jsxImportSource @emotion/react */
import { appContext } from '../ApplicationContext';
import { LoadingStateButton } from '../component/base-component/LoadingButton';
import { LoadingState } from '../interfaces';
import { colors } from '../styles/vars';
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';

const logoutPath = '/logout';

export const LogoutForm = () => {
  const [loading, setLoading] = useState<LoadingState>('Idle');
  return (
    <form
      method="post"
      action={logoutPath}
      onSubmit={() => setLoading('Loading')}
    >
      <input
        type="hidden"
        name={appContext.csrfTokenService().inputName}
        value={appContext.csrfTokenService().token}
      />
      <LoadingStateButton
        loadingState={loading}
        type="submit"
        css={css`
          background: ${colors.clearGrey};
          height: 24px;
          top: -4px;
        `}
      >
        Logout
      </LoadingStateButton>
    </form>
  );
};
