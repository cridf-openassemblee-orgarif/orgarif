/** @jsxImportSource @emotion/react */
import { EmotionStyles } from '../../interfaces';
import { state } from '../../state/state';
import { assertUnreachable, extractEmotionCss } from '../../utils';
import { emptyFilters } from '../../utils/filters';
import { getValue } from '../../utils/nominal-class';
import { ApplicationRoute, routePathMap } from './routes';
import { buildPath } from './routing-utils';
import { css, cx } from '@emotion/css';
import { Button, ButtonTypeMap } from '@mui/material';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

const linkDefaultElement = 'Link';

const RouteLinkBase = (
  props: PropsWithChildren<{
    route: ApplicationRoute;
    doesMatch: boolean;
    variant?: ButtonTypeMap['props']['variant'];
    activeCss?: EmotionStyles;
    element?: 'Link' | 'Button';
    className?: string;
    removeFilters?: boolean;
  }>
) => {
  const [filters, setFilters] = useRecoilState(state.filters);
  const setForceListOrganisme = useSetRecoilState(state.forceListOrganisme);
  const properties = {
    to: buildPath(props.route, props.removeFilters ? emptyFilters : filters),
    variant: props.variant ?? 'outlined',
    className: cx(
      css`
        font-weight: ${props.doesMatch ? 'bold' : 'normal'};
        text-decoration: ${props.doesMatch ? 'underline' : 'none'};

        &:hover {
          text-decoration: underline;
        }
      `,
      props.className,
      css`
        ${props.doesMatch ? props.activeCss : undefined}
      `
    ),
    onClick: props.removeFilters
      ? () => {
          setFilters(emptyFilters);
          setForceListOrganisme(false);
        }
      : undefined
  };
  const element = props.element ?? linkDefaultElement;
  // FIXME pb active css passe avant css, pas bon !
  switch (element) {
    case 'Link':
      return <Link {...properties}>{props.children}</Link>;
    case 'Button':
      return (
        <Button component={Link} {...properties}>
          {props.children}
        </Button>
      );
    default:
      assertUnreachable(element);
  }
};

export const RouteLink = (
  props: PropsWithChildren<{
    route: ApplicationRoute;
    // TODO only available for Button ? buttonVariant ?
    variant?: ButtonTypeMap['props']['variant'];
    css?: EmotionStyles;
    activeCss?: EmotionStyles;
    element?: 'Link' | 'Button';
    removeFilters?: boolean;
  }>
) => (
  <RouteLinkBase
    route={props.route}
    doesMatch={false}
    variant={props.variant}
    activeCss={props.activeCss}
    element={props.element}
    removeFilters={props.removeFilters}
    {...extractEmotionCss(props)}
  >
    {props.children}
  </RouteLinkBase>
);

export const MatchRouteLink = (
  props: PropsWithChildren<{
    route: ApplicationRoute;
    matchModel: 'FullMatch' | 'PartialMatch';
    variant?: ButtonTypeMap['props']['variant'];
    css?: EmotionStyles;
    activeCss?: EmotionStyles;
    element?: 'Link' | 'Button';
  }>
) => {
  const match = useMatch({
    path: getValue(routePathMap, props.route.name),
    end: props.matchModel === 'FullMatch'
  });
  // FIXME check css works
  return (
    <RouteLinkBase
      route={props.route}
      doesMatch={!!match}
      variant={props.variant}
      activeCss={props.activeCss}
      element={props.element}
      {...extractEmotionCss(props)}
    >
      {props.children}
    </RouteLinkBase>
  );
};
