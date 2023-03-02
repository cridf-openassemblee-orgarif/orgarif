/** @jsxImportSource @emotion/react */
import { LoadingState } from '../../../interfaces';
import { appContext } from '../../../services/ApplicationContext';
import { colors } from '../../styles/vars';
import { LoadingStateButton } from '../LoadingButton';
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';

const logoutPath = '/logout';
export const LogoutButton = () => {
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
