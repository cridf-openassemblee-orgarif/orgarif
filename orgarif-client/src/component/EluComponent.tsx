/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useRecoilValue } from 'recoil';
import { EluId } from '../domain/id';
import { get } from '../domain/nominal-class';
import { state } from '../state/state';

export const EluComponent = (props: { eluId: EluId }) => {
  const elusById = useRecoilValue(state.elusById);
  const e = get(elusById, props.eluId);
  return (
    <p>
      {e.prenom} {e.nom}
    </p>
  );
};
