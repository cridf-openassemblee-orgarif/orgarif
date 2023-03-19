/** @jsxImportSource @emotion/react */
import { ClientUid } from '../../domain/client-ids';
import { EmotionStyles, LoadingState } from '../../interfaces';
import { assertUnreachable, extractEmotionCss } from '../../utils';
import { css } from '@emotion/react';
import { Button, CircularProgress } from '@mui/material';
import { ButtonTypeMap } from '@mui/material/Button/Button';
import * as React from 'react';
import { PropsWithChildren, ReactElement, useState } from 'react';

const ButtonContent = (
  props: PropsWithChildren<{
    loadingState: LoadingState;
  }>
) => {
  switch (props.loadingState) {
    case 'Idle':
    case 'Error':
      return <>{props.children}</>;
    case 'Loading':
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
    type={props.type ?? props.formId ? 'submit' : undefined}
    variant={props.variant ?? 'contained'}
    startIcon={
      props.startIcon
        ? React.cloneElement(props.startIcon, {
            style: {
              // so button sizing doesn't change
              visibility: props.loadingState === 'Idle' ? 'visible' : 'hidden'
            }
          })
        : undefined
    }
    disabled={props.loadingState === 'Loading'}
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
  const [loading, setLoading] = useState<LoadingState>('Idle');
  return (
    <LoadingButtonBase
      onClick={() => {
        setLoading('Loading');
        props
          .onClick()
          .then(() => setLoading('Idle'))
          .catch(() => setLoading('Error'));
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
