/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';

export const NombreRepresentantsComponent = (props: {
  nombreRepresentants?: number;
  nombreSuppleants?: number;
}) => (
  <div
    css={css`
      padding-left: 15%;
    `}
  >
    {props.nombreRepresentants} représentants, {props.nombreSuppleants}{' '}
    suppléants
  </div>
);
