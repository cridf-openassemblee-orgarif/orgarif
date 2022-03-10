/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useState } from 'react';
import { appContext } from '../ApplicationContext';
import { FormLoadingButton } from '../component/base-component/LoadingButton';
import { LoadingState } from '../interfaces';
import { css } from '@emotion/react';
import { colors } from '../styles/vars';

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
      <FormLoadingButton
        loadingState={loading}
        forwardCss={css`
          background: ${colors.clearGrey};
          height: 24px;
          top: -4px;
        `}
      >
        Logout
      </FormLoadingButton>
    </form>
  );
};
