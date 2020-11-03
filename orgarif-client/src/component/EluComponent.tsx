/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useRecoilState } from 'recoil';
import { EluId } from '../domain/id';
import { get } from '../domain/nominal-class';
import { state } from '../state/state';

export const EluComponent = (props: { eluId: EluId }) => {
  const [elus] = useRecoilState(state.elus);
  const e = get(elus, props.eluId);
  return (
    <div>
      {e.prenom} {e.nom}
    </div>
  );
};
