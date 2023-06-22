/** @jsxImportSource @emotion/react */
import { LoadingState } from '../../interfaces';
import { LoadingButton, LoadingStateButton } from '../common/LoadingButton';
import { t } from './ComponentsDemonstration.i18n';
import { css } from '@emotion/react';
import { Add } from '@mui/icons-material';
import * as React from 'react';
import { useState } from 'react';

export const ComponentsDemonstration = () => {
  const [loading, setLoading] = useState<LoadingState>('Idle');
  const onClick = () => {
    setLoading('Loading');
    const p = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        setLoading('Idle');
        resolve();
      }, 1000);
    });
    return p;
  };
  const props = {
    onClick: onClick,
    variant: 'outlined',
    startIcon: <Add />,
    css: css`
      font-weight: bold;
    `
  } as any;
  return (
    <>
      <h1>{t.ComponentsDemonstration()}</h1>
      <div
        css={css`
          margin: 20px;
        `}
      >
        <LoadingButton {...props}>{t.test()}</LoadingButton>
      </div>
      <div
        css={css`
          margin: 20px;
        `}
      >
        <LoadingStateButton {...props} loadingState={loading}>
          {t.test2()}
        </LoadingStateButton>
      </div>
    </>
  );
};
