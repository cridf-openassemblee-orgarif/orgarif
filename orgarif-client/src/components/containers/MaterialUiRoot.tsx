/** @jsxImportSource @emotion/react */
import { globalStyles } from '../styles/common-styles';
import { orgarifTheme } from '../styles/theme';
import { Global } from '@emotion/react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import StylesProvider from '@mui/styles/StylesProvider';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import { PropsWithChildren } from 'react';

export const MaterialUiRoot = (props: PropsWithChildren) => (
  <>
    <Global styles={[globalStyles]} />
    <StylesProvider injectFirst>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={orgarifTheme}>
          <SnackbarProvider maxSnack={3}>{props.children}</SnackbarProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </StylesProvider>
  </>
);
