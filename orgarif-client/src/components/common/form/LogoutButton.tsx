/** @jsxImportSource @emotion/react */
<<<<<<< HEAD:orgarif-client/src/form/LogoutForm.tsx
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { appContext } from '../ApplicationContext';
import { LoadingStateButton } from '../component/base-component/LoadingButton';
import { SignOut } from '../icon/collection/SignOut';
import { LoadingState } from '../interfaces';
import { colors } from '../styles/colors';
=======
import { LoadingState } from '../../../interfaces';
import { appContext } from '../../../services/ApplicationContext';
import { colors } from '../../styles/vars';
import { LoadingStateButton } from '../LoadingButton';
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
>>>>>>> template:orgarif-client/src/components/common/form/LogoutButton.tsx

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
