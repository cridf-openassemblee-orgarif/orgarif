/** @jsxImportSource @emotion/react */
import { breakpoints } from '../styles/breakpoints';
import { colors } from '../styles/colors';
import { Dimensions } from '../styles/dimensions';
import { orgarifTheme } from '../styles/theme';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import * as React from 'react';
import { PropsWithChildren } from 'react';

export const rootViewTitleHeight = 64;

export const RootViewTitle = (
  props: PropsWithChildren<{ label: string; position: number }>
) => (
  <div
    css={css`
      position: relative;
      top: -1px;
      display: flex;
      overflow: hidden;
      @media (${breakpoints.LAPTOP}) {
        position: sticky;
        top: ${Dimensions.headerHeight +
        props.position * (rootViewTitleHeight - /* for border */ 1)}px;
        padding: 12px 48px;
        height: ${rootViewTitleHeight}px;
        background: ${colors.mainBackground};
        z-index: 1;
      }
      border-top: ${props.position !== 0
        ? '1px solid ' + orgarifTheme.palette.secondary.main
        : 0};
      border-bottom: 1px solid ${orgarifTheme.palette.secondary.main};
    `}
  >
    <Typography
      component="h5"
      variant="h4"
      css={css`
        font-size: 2rem;
        white-space: nowrap;
        text-transform: uppercase;
      `}
    >
      {props.label}
    </Typography>
    {props.children}
  </div>
);
