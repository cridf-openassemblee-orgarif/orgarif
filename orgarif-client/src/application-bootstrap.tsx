import { Global } from '@emotion/react';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider
} from '@mui/material';
import StylesProvider from '@mui/styles/StylesProvider';
import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { Root } from './container/Root';
import { ApplicationRouter } from './routing/ApplicationRouter';
import { globalStyles } from './styles/common-styles';
import { createRoot } from 'react-dom/client';

global.log = (logged: any) => console.log(logged);

const muiTheme = createTheme({
  typography: {
    // fontSize: fonts.baseSize,
    // htmlFontSize: fonts.baseSize
  }
});
// TODO[tmpl] ok to use ! ?
const root = createRoot(document.getElementById('root')!);
root.render(
  <RecoilRoot>
    <Global styles={[globalStyles]} />
    <StylesProvider injectFirst>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <Root>
            <ApplicationRouter />
          </Root>
        </ThemeProvider>
      </StyledEngineProvider>
    </StylesProvider>
  </RecoilRoot>
);
