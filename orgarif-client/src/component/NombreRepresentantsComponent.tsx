/** @jsxImportSource @emotion/react */
import * as React from 'react';

export const NombreRepresentantsComponent = (props: {
  nombreRepresentants?: number;
  nombreSuppleants?: number;
}) => (
  <div>
    {props.nombreRepresentants} représentants, {props.nombreSuppleants}{' '}
    suppléants
  </div>
);
