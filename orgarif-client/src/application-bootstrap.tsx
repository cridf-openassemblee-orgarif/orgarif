import { MaterialUiRoot } from './components/containers/MaterialUiRoot';
import { ApplicationRouter } from './components/routing/ApplicationRouter';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

const rootElement = document.getElementById('root') as Element;
const root = createRoot(rootElement);

global.log = (logged: any) => console.log(logged);

root.render(
  <RecoilRoot>
    <MaterialUiRoot>
      <CssBaseline />
      <ApplicationRouter />
    </MaterialUiRoot>
  </RecoilRoot>
);
