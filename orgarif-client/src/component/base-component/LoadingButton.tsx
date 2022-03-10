/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, CircularProgress } from '@mui/material';
import * as React from 'react';
import { PropsWithChildren, useState } from 'react';
import { assertUnreachable } from '../../utils';
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
    loadingState: LoadingState;
    onClick?: () => void;
    type?: 'submit';
    forwardCss?: EmotionStyles;
  }>
) => (
  <Button
    variant="outlined"
    onClick={props.onClick}
    disabled={props.loadingState === 'loading'}
    type={props.type}
    css={props.forwardCss}
  >
    <ButtonContent loadingState={props.loadingState}>
      {props.children}
    </ButtonContent>
  </Button>
);

export const LoadingButton = (
  props: PropsWithChildren<{
    onClick: () => Promise<void>;
  }>
) => {
  const [loading, setLoading] = useState<LoadingState>('idle');
  return (
    <LoadingButtonBase
      loadingState={loading}
      onClick={() => {
        setLoading('loading');
        props
          .onClick()
          .then(() => setLoading('idle'))
          .catch(() => setLoading('error'));
      }}
    >
      {props.children}
    </LoadingButtonBase>
  );
};

export const FormLoadingButton = (
  props: PropsWithChildren<{
    loadingState: LoadingState;
    forwardCss?: EmotionStyles;
  }>
) => (
  <LoadingButtonBase
    loadingState={props.loadingState}
    type="submit"
    forwardCss={props.forwardCss}
  >
    {props.children}
  </LoadingButtonBase>
);
