/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, CircularProgress } from '@mui/material';
import * as React from 'react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { assertUnreachable, extractEmotionCss } from '../../utils';
import { EmotionStyles, LoadingState } from '../../interfaces';

const ButtonContent = (
  props: PropsWithChildren<{
    loadingState: LoadingState;
  }>
) => {
  switch (props.loadingState) {
    case 'idle':
    case 'error':
      return <>{props.children}</>;
    case 'loading':
      return (
        <>
          <div
            css={css`
              visibility: hidden;
            `}
          >
            {props.children}
          </div>
          <div
            css={css`
              position: absolute;
              text-align: center;
              padding-top: 6px;
            `}
          >
            <CircularProgress size={18} />
          </div>
        </>
      );
    default:
      assertUnreachable(props.loadingState);
  }
};

const LoadingButtonBase = (
  props: PropsWithChildren<{
    onClick?: () => void;
    loadingState: LoadingState;
    type?: 'submit';
    variant?: 'text' | 'outlined' | 'contained';
    startIcon?: ReactNode;
    css?: EmotionStyles;
  }>
) => (
  <Button
    onClick={props.onClick}
    type={props.type}
    variant={props.variant ?? 'contained'}
    startIcon={props.loadingState === 'idle' ? props.startIcon : undefined}
    disabled={props.loadingState === 'loading'}
    css={css`
      padding: 0 30px;
    `}
    {...extractEmotionCss(props)}
  >
    <ButtonContent loadingState={props.loadingState}>
      {props.children}
    </ButtonContent>
  </Button>
);

export const LoadingButton = (
  props: PropsWithChildren<{
    onClick: () => Promise<void>;
    type?: 'submit';
    variant?: 'text' | 'outlined' | 'contained';
    startIcon?: ReactNode;
    css?: EmotionStyles;
  }>
) => {
  const [loading, setLoading] = useState<LoadingState>('idle');
  return (
    <LoadingButtonBase
      onClick={() => {
        setLoading('loading');
        props
          .onClick()
          .then(() => setLoading('idle'))
          .catch(() => setLoading('error'));
      }}
      loadingState={loading}
      type={props.type}
      variant={props.variant}
      startIcon={props.startIcon}
      {...extractEmotionCss(props)}
    >
      {props.children}
    </LoadingButtonBase>
  );
};

export const LoadingStateButton = (
  props: PropsWithChildren<{
    onClick?: () => void;
    loadingState: LoadingState;
    type?: 'submit';
    variant?: 'text' | 'outlined' | 'contained';
    startIcon?: ReactNode;
    css?: EmotionStyles;
  }>
) => (
  <LoadingButtonBase
    onClick={props.onClick}
    loadingState={props.loadingState}
    type={props.type}
    variant={props.variant}
    startIcon={props.startIcon}
    {...extractEmotionCss(props)}
  >
    {props.children}
  </LoadingButtonBase>
);
