import { Global } from '@emotion/react';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider
} from '@mui/material';
import StylesProvider from '@mui/styles/StylesProvider';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { Root } from './container/Root';
import { ApplicationRouter } from './routing/ApplicationRouter';
import { globalStyles } from './styles/common-styles';

global.log = (logged: any) => console.log(logged);

const muiTheme = createTheme({
  typography: {
    // fontSize: fonts.baseSize,
    // htmlFontSize: fonts.baseSize
  }
});
ReactDOM.render(
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
  </RecoilRoot>,
  document.getElementById('root')
);
