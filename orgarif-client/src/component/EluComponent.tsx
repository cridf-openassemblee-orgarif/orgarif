/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { EluId } from '../domain/id';
import { state } from '../state/state';
import { getValue } from '../utils/nominal-class';

export const EluComponent = (props: { eluId: EluId }) => {
  const elusById = useRecoilValue(state.elusById);
  const e = getValue(elusById, props.eluId);
  return (
    <p>
      {e.prenom} {e.nom}
    </p>
  );
};
