/** @jsxImportSource @emotion/react */
import { globalStyles } from '../styles/common-styles';
import { Global } from '@emotion/react';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider
} from '@mui/material';
import StylesProvider from '@mui/styles/StylesProvider';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import { PropsWithChildren } from 'react';

const muiTheme = createTheme({
  typography: {
    // fontSize: fonts.baseSize,
    // htmlFontSize: fonts.baseSize
  }
});
export const MaterialUiRoot = (props: PropsWithChildren) => (
  <>
    <Global styles={[globalStyles]} />
    <StylesProvider injectFirst>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <SnackbarProvider maxSnack={3}>{props.children}</SnackbarProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </StylesProvider>
  </>
);
