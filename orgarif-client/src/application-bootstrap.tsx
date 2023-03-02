import { ApplicationRouter } from './components/routing/ApplicationRouter';
import { globalStyles } from './components/styles/common-styles';
import orgarifTheme from './components/styles/theme';
import { Global } from '@emotion/react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import StylesProvider from '@mui/styles/StylesProvider';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

const rootElement = document.getElementById('root') as Element;
const root = createRoot(rootElement);

global.log = (logged: any) => console.log(logged);

root.render(
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
  </RecoilRoot>
);
