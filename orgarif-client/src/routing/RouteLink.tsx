/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../ApplicationContext';
import { EmotionStyles } from '../interfaces';
import { Route } from './routes';
import { extractEmotionCss } from '../utils';

export const RouteLink = (
  props: PropsWithChildren<{
    route: Route;
    css?: EmotionStyles;
  }>
) => {
  return (
    <Link
      to={appContext.applicationHistory().buildPath(props.route)}
      {...extractEmotionCss(props)}
    >
      {props.children}
    </Link>
  );
};
