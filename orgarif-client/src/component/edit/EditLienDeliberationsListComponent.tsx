/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useState } from 'react';
import { InstanceId, OrganismeId } from '../../domain/ids';
import { LienDeliberationInfos } from '../../domain/organisme';
import { formatLocaleDate } from '../../simple-fr';
import { stringifyNominalString } from '../../utils/nominal-class';
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
    <div
      css={css`
        padding: 20px 10px 20px 10px;
      `}
    >
      <h3
        css={css`
          padding-left: 40px;
        `}
      >
        Délibérations
      </h3>
      <div
        css={css`
          margin: 20px 0;
        `}
      >
        {lienDeliberations.map(d => (
          <div
            key={stringifyNominalString(d.id)}
            css={css`
              padding: 10px 0;
            `}
          >
            {d.deliberation.libelle} du{' '}
            {formatLocaleDate(d.deliberation.deliberationDate)}
          </div>
        ))}
      </div>
      <AddLienDeliberationComponent
        organismeId={props.organismeId}
        instanceId={props.instanceId}
        lienDeliberations={lienDeliberations}
        setLienDeliberations={setLienDeliberations}
      />
    </div>
  );
};
