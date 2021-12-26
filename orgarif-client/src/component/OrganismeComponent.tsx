/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { OrganismeDto } from '../domain/organisme';

export const OrganismeComponent = (props: { organisme: OrganismeDto }) => {
  return (
    <div
      css={css`
        width: 100%;
      `}
    ></div>
  );
};
