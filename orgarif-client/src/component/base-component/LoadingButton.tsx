/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, CircularProgress } from '@mui/material';
import * as React from 'react';
import { MouseEventHandler, PropsWithChildren } from 'react';
import { assertUnreachable } from '../../utils';
import { LoadingState } from '../../interfaces';

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

export const LoadingButton = (
  props: PropsWithChildren<{
    loadingState: LoadingState;
    onClick?: MouseEventHandler;
    type?: 'submit';
  }>
) => {
  return (
    <Button
      variant="contained"
      onClick={props.onClick}
      disabled={props.loadingState === 'loading'}
      type={props.type}
    >
      <ButtonContent loadingState={props.loadingState}>
        {props.children}
      </ButtonContent>
    </Button>
  );
};
