import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { Root } from './container/Root';
import { ApplicationRouter } from './routing/ApplicationRouter';
import { createRoot } from 'react-dom/client';
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
