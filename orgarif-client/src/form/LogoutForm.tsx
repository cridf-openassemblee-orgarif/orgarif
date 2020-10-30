/** @jsx jsx */
import { jsx } from '@emotion/core';
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
          ref={(c) => (this.logoutForm = c)}
          method="post"
          action={logoutPath}
        >
          <input
            type="hidden"
            name={appContext.csrfTokenService().inputName}
            value={appContext.csrfTokenService().token}
          />
        </form>
        <button onClick={this.logout}>logout</button>
      </React.Fragment>
    );
  }
}
