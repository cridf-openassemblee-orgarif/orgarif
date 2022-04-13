import { Global } from '@emotion/react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import StylesProvider from '@mui/styles/StylesProvider';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ApplicationRouter } from './routing/ApplicationRouter';
import { globalStyles } from './styles/common-styles';
import orgarifTheme from './styles/theme';

global.log = (logged: any) => console.log(logged);

ReactDOM.render(
  <RecoilRoot>
    <Global styles={[globalStyles]} />
    <StylesProvider injectFirst>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={orgarifTheme}>
          <CssBaseline />
          <ApplicationRouter />
        </ThemeProvider>
      </StyledEngineProvider>
    </StylesProvider>
  </RecoilRoot>,
  document.getElementById('root')
);
