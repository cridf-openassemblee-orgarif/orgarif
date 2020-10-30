import { Global } from '@emotion/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router as ReactRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { RecoilRoot } from 'recoil';
import { appContext } from './ApplicationContext';
import { HotRoot as Root } from './container/Root';
import { ApplicationRouter } from './routing/ApplicationRouter';
import { globalStyles } from './styles/common-styles';
import './styles/ReactToastify-additional.css';

global.log = (logged: any) => console.log(logged);

const productionBuild = process.env.NODE_ENV === 'production';
let devTools = (f: any) => f;
if (!productionBuild && global.__REDUX_DEVTOOLS_EXTENSION__) {
  devTools = global.__REDUX_DEVTOOLS_EXTENSION__();
}

ReactDOM.render(
  <RecoilRoot>
    <Global styles={[globalStyles]} />
    <ReactRouter history={appContext.applicationHistory().browserHistory}>
      <Root>
        <ApplicationRouter />
      </Root>
    </ReactRouter>
  </RecoilRoot>,
  document.getElementById('root')
);
