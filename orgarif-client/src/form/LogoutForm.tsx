/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useState } from 'react';
import { appContext } from '../ApplicationContext';
import { LoadingStateButton } from '../component/base-component/LoadingButton';
import { LoadingState } from '../interfaces';

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
      <LoadingStateButton loadingState={loading} type="submit">
        Déconnexion
      </LoadingStateButton>
    </form>
  );
};
