import { Global } from '@emotion/react';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router as ReactRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { RecoilRoot } from 'recoil';
import { appContext } from './ApplicationContext';
import { HotRoot as Root } from './container/Root';
import { ApplicationRouter } from './routing/ApplicationRouter';
import { globalStyles } from './styles/common-styles';
import './styles/ReactToastify-additional.css';
import { colors, fonts } from './styles/vars';

global.log = (logged: any) => console.log(logged);

const productionBuild = process.env.NODE_ENV === 'production';
let devTools = (f: any) => f;
if (!productionBuild && global.__REDUX_DEVTOOLS_EXTENSION__) {
  devTools = global.__REDUX_DEVTOOLS_EXTENSION__();
}

const muiTheme = createMuiTheme({
  palette: {
    secondary: { main: colors.errorRed }
  },
  typography: {
    htmlFontSize: fonts.baseSize
  }
});
ReactDOM.render(
  <RecoilRoot>
    <Global styles={[globalStyles]} />
    <ReactRouter history={appContext.applicationHistory().browserHistory}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={muiTheme}>
          <Root>
            <ApplicationRouter />
          </Root>
        </MuiThemeProvider>
      </StylesProvider>
    </ReactRouter>
  </RecoilRoot>,
  document.getElementById('root')
);
