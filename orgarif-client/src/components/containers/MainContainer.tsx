/** @jsxImportSource @emotion/react */
import { Menu } from '../common/Menu';
import { css } from '@emotion/react';
import * as React from 'react';
import { PropsWithChildren } from 'react';

export const MainContainer = (props: PropsWithChildren<{}>) => (
  <div
    css={css`
      position: absolute;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    `}
  >
    <Menu />
    <div
      css={css`
        flex: 1;
        overflow: scroll;
        padding: 10px;
      `}
    >
      {props.children}
    </div>
  </div>
);
