/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { EmotionStyles } from '../interfaces';
import { ApplicationRoute } from './routes';
import { extractEmotionCss } from '../utils';
import { buildPath } from './useGoTo';
import { Button } from '@mui/material';
import { ButtonTypeMap } from '@mui/material/Button/Button';

export const RouteButton = (
  props: PropsWithChildren<{
    route: ApplicationRoute;
    variant?: ButtonTypeMap['props']['variant'];
    css?: EmotionStyles;
  }>
) => {
  // avoids TS to complain
  const to = {
    to: buildPath(props.route)
  };
  return (
    <Button
      component={Link}
      variant={props.variant}
      {...to}
      {...extractEmotionCss(props)}
    >
      {props.children}
    </Button>
  );
};
