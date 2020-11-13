/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { PropsWithChildren } from 'react';
import { Menu } from './Menu';

export const MainContainer = (props: PropsWithChildren<{}>) => (
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
        overflow: scroll;
      `}
    >
      <Menu />
      <div
        css={css`
          margin: 10px;
        `}
      >
        {props.children}
      </div>
    </div>
  </div>
);
