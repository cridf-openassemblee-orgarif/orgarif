/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { EmotionStyles } from '../interfaces';
import { ApplicationRoute } from './routes';
import { extractEmotionCss } from '../utils';
import { buildPath } from './useGoTo';

export const RouteLink = (
  props: PropsWithChildren<{
    route: ApplicationRoute;
    css?: EmotionStyles;
  }>
) => (
  <Link to={buildPath(props.route)} {...extractEmotionCss(props)}>
    {props.children}
  </Link>
);
