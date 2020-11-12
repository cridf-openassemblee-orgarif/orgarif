/** @jsx jsx */
import { jsx } from '@emotion/core';
import { stringifyNominalString } from '../../domain/nominal-class';
import { DeliberationInfos } from '../../domain/organisme';
import { AddDeliberationComponentModif } from './AddDeliberationComponentModif';
import { AddDeliberationComponent } from './AddDeliberationComponent';

export const EditDeliberationsListComponent = (props: {
  deliberations: DeliberationInfos[];
}) => {
  if (props.deliberations.length === 0) {
    return null;
  }
  return (
    <div>
      <h3>Délibérations</h3>
      {props.deliberations.map((d) => (
        <div key={stringifyNominalString(d.id)}>
          {d.libelle} du {d.deliberationDate}
        </div>
      ))}
      <AddDeliberationComponent />
    </div>
  );
};
