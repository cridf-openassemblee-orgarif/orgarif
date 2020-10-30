/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import * as React from 'react';
import { Menu } from './Menu';

export const MainContainer: React.FunctionComponent = (props) => (
  <div
    css={css`
      position: absolute;
      display: flex;
      height: 100%;
      width: 100%;
    `}
  >
    <div
      css={css`
        flex: 1;
        margin: 10px;
        overflow: scroll;
      `}
    >
      <Menu />
      {props.children}
    </div>
  </div>
);
