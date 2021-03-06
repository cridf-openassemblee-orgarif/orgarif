import { Global } from '@emotion/react';
import {
  createMuiTheme,
  MuiThemeProvider,
  StylesProvider
} from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router as ReactRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { RecoilRoot } from 'recoil';
import { appContext } from './ApplicationContext';
import { SharedHeightContainerContext } from './component/base-component/SharedHeightContainerContext';
import { Root } from './container/Root';
import { ApplicationRouter } from './routing/ApplicationRouter';
import { globalStyles } from './styles/common-styles';
import './styles/ReactToastify-additional.css';

global.log = (logged: any) => console.log(logged);

const muiTheme = createMuiTheme({
  typography: {
    // fontSize: fonts.baseSize,
    // htmlFontSize: fonts.baseSize
  }
});
ReactDOM.render(
  <RecoilRoot>
    <Global styles={[globalStyles]} />
    <ReactRouter history={appContext.applicationHistory().browserHistory}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={muiTheme}>
          <Root>
            <SharedHeightContainerContext>
              <ApplicationRouter />
            </SharedHeightContainerContext>
          </Root>
        </MuiThemeProvider>
      </StylesProvider>
    </ReactRouter>
  </RecoilRoot>,
  document.getElementById('root')
);
