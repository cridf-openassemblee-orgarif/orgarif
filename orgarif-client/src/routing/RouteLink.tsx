/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../ApplicationContext';
import { EmotionStyles } from '../interfaces';
import { Route } from './routes';

interface Props {
  route: Route;
  forwardCss?: EmotionStyles;
}

export const RouteLink: FunctionComponent<Props> = (props) => {
  const Styled = props.forwardCss ? styled(Link)(props.forwardCss) : Link;
  return (
    <Styled to={appContext.applicationHistory().buildPath(props.route)}>
      {props.children}
    </Styled>
  );
};