<<<<<<< HEAD
import { Global } from '@emotion/react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import StylesProvider from '@mui/styles/StylesProvider';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ApplicationRouter } from './routing/ApplicationRouter';
import { globalStyles } from './styles/common-styles';
import orgarifTheme from './styles/theme';

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
=======
import { MaterialUiRoot } from './components/containers/MaterialUiRoot';
import { Root } from './components/containers/Root';
import { ApplicationRouter } from './components/routing/ApplicationRouter';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

global.log = (logged: any) => console.log(logged);

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <RecoilRoot>
      <MaterialUiRoot>
        <Root>
          <ApplicationRouter />
        </Root>
      </MaterialUiRoot>
    </RecoilRoot>
  );
}
>>>>>>> template
