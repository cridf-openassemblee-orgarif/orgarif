/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import * as React from 'react';
import { PureComponent } from 'react';
import { appContext } from '../ApplicationContext';

const logoutPath = '/logout';

export class LogoutForm extends PureComponent {
  public logoutForm: HTMLFormElement | null = null;

  // [doc] is here to prevent double submission
  // is NOT state (should not trigger a render)
  private isLoggingOut = false;

  public logout = () => {
    if (!this.isLoggingOut) {
      this.isLoggingOut = true;
      this.logoutForm!.submit();
    }
  };

  render() {
    return (
      <React.Fragment>
        <form
          ref={c => (this.logoutForm = c)}
          method="post"
          action={logoutPath}
        >
          <input
            type="hidden"
            name={appContext.csrfTokenService().inputName}
            value={appContext.csrfTokenService().token}
          />
        </form>
        <Button
          onClick={this.logout}
          size="small"
          css={css`
            top: -4px;
            height: 24px;
            background-color: white;
            font-size: 0.8rem;
            padding: 0 10px;
          `}
        >
          Logout
        </Button>
      </React.Fragment>
    );
  }
}
