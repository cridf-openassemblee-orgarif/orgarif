/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { InstanceId, OrganismeId } from '../../domain/id';
import { stringifyNominalString } from '../../domain/nominal-class';
import { LienDeliberationInfos } from '../../domain/organisme';
import { AddDeliberationComponent } from './AddDeliberationComponent';

export const EditDeliberationsListComponent = (props: {
  lienDeliberations: LienDeliberationInfos[];
  organismeId: OrganismeId;
  instanceId?: InstanceId;
}) => {
  if (props.lienDeliberations.length === 0) {
    return null;
  }
  const [lienDeliberations, setLienDeliberations] = useState<
    LienDeliberationInfos[]
  >(props.lienDeliberations);
  return (
    <div>
      <h3>Délibérations</h3>
      {lienDeliberations.map((d) => (
        <div key={stringifyNominalString(d.id)}>
          {d.deliberation.libelle} du {d.deliberation.deliberationDate}
        </div>
      ))}
      <AddDeliberationComponent />
    </div>
  );
};
