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
import { SnackbarProvider } from 'notistack';
import { PropsWithChildren } from 'react';
import { MaterialUiRoot } from './container/MaterialUiRoot';

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
