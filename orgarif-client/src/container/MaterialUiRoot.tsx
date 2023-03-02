/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { globalStyles } from '../styles/common-styles';
import StylesProvider from '@mui/styles/StylesProvider';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider
} from '@mui/material';
import { SnackbarProvider } from 'notistack';

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
