/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, CircularProgress } from '@mui/material';
import * as React from 'react';
import { PropsWithChildren, ReactElement, useState } from 'react';
import { assertUnreachable, extractEmotionCss } from '../../utils';
import { EmotionStyles, LoadingState } from '../../interfaces';
import { ClientUid } from '../../domain/client-ids';
import { ButtonTypeMap } from '@mui/material/Button/Button';

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
              // so button sizing doesn't change
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
    variant?: ButtonTypeMap['props']['variant'];
    startIcon?: ReactElement;
    css?: EmotionStyles;
    formId?: ClientUid;
  }>
) => (
  <Button
    onClick={props.onClick}
    type={props.type}
    variant={props.variant ?? 'contained'}
    startIcon={
      props.startIcon
        ? React.cloneElement(props.startIcon, {
            style: {
              // so button sizing doesn't change
              visibility: props.loadingState === 'idle' ? 'visible' : 'hidden'
            }
          })
        : undefined
    }
    disabled={props.loadingState === 'loading'}
    form={props.formId}
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
    variant?: ButtonTypeMap['props']['variant'];
    startIcon?: ReactElement;
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
    variant?: ButtonTypeMap['props']['variant'];
    startIcon?: ReactElement;
    css?: EmotionStyles;
    formId?: ClientUid;
  }>
) => (
  <LoadingButtonBase
    onClick={props.onClick}
    loadingState={props.loadingState}
    type={props.type}
    variant={props.variant}
    startIcon={props.startIcon}
    formId={props.formId}
    {...extractEmotionCss(props)}
  >
    {props.children}
  </LoadingButtonBase>
);
