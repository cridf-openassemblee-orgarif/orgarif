/** @jsxImportSource @emotion/react */
import { OrganismeDto } from '../../generated/domain/Organisme';
import { css } from '@emotion/react';
import * as React from 'react';

export const OrganismeComponent = (props: { organisme: OrganismeDto }) => {
  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      {JSON.stringify(props.organisme)}
    </div>
  );
};
