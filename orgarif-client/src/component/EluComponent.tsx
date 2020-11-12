/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { EluId } from '../domain/id';
import { get } from '../domain/nominal-class';
import { state } from '../state/state';
import { colors } from '../styles/vars';

export const EluComponent = (props: { eluId: EluId }) => {
  const elusById = useRecoilValue(state.elusById);
  const e = get(elusById, props.eluId);
  return (
    <div>
      <div
        css={css`
          height: 50px;
          width: 50px;
          overflow: hidden;
          text-align: center;
          background: ${colors.white};
        `}
      >
        <img
          src={`http://localhost:8080${e.imageUrl}`}
          css={css`
            max-height: 50px;
            max-width: 50px;
          `}
        />
      </div>
      <p>
        {e.prenom} {e.nom}
      </p>
    </div>
  );
};
