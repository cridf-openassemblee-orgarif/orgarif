/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { InstanceId, OrganismeId } from '../../domain/id';
import { stringifyNominalString } from '../../domain/nominal-class';
import { LienDeliberationInfos } from '../../domain/organisme';
import { AddLienDeliberationComponent } from './AddLienDeliberationComponent';

export const EditLienDeliberationsListComponent = (props: {
  lienDeliberations: LienDeliberationInfos[];
  organismeId: OrganismeId;
  instanceId?: InstanceId;
}) => {
  const [lienDeliberations, setLienDeliberations] = useState<
    LienDeliberationInfos[]
  >(props.lienDeliberations);
  return (
    <div>
      <h3>Délibérations</h3>
      {lienDeliberations.map((d) => (
        <div
          key={stringifyNominalString(d.id)}
          css={css`
            padding: 10px 0;
          `}
        >
          {d.deliberation.libelle} du {d.deliberation.deliberationDate}
        </div>
      ))}
      <AddLienDeliberationComponent
        organismeId={props.organismeId}
        instanceId={props.instanceId}
        lienDeliberations={lienDeliberations}
        setLienDeliberations={setLienDeliberations}
      />
    </div>
  );
};
