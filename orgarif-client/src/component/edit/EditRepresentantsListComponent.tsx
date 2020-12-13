/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { RepresentantListId } from '../../domain/client-id';
import { InstanceId, OrganismeId } from '../../domain/id';
import { Representant, RepresentantOrSuppleant } from '../../domain/organisme';
import {
  Dict,
  instanciateNominalString,
  stringifyNominalString
} from '../../utils/nominal-class';
import { SharedHeightContainer } from '../base-component/SharedHeightContainer';
import { AddRepresentantComponent } from './AddRepresentantComponent';
import { RepresentantsListComponent } from './RepresentantsListComponent';

export const EditRepresentantsListComponent = (props: {
  organismeId: OrganismeId;
  instanceId: InstanceId | undefined;
  representantOrSuppleant: RepresentantOrSuppleant;
  representantsLists: Dict<RepresentantListId, Representant[]>;
  setRepresentantsLists: (
    lists: Dict<RepresentantListId, Representant[]>
  ) => void;
  label: string;
  emptyListLabel: string;
}) => (
  <React.Fragment>
    <h4>{props.label}</h4>
    <SharedHeightContainer
      groupId={instanciateNominalString(
        stringifyNominalString(
          'representants-' +
            (props.instanceId ? 'instances-' : '') +
            props.organismeId
        )
      )}
    >
      <RepresentantsListComponent
        organismeId={props.organismeId}
        instanceId={props.instanceId}
        representantOrSuppleant={props.representantOrSuppleant}
        representantsLists={props.representantsLists}
        setRepresentantsLists={props.setRepresentantsLists}
        emptyListLabel={props.emptyListLabel}
      />
      <div
        css={css`
          padding: 4px 10px;
        `}
      >
        <AddRepresentantComponent
          organismeId={props.organismeId}
          instanceId={props.instanceId}
          representantOrSuppleant={props.representantOrSuppleant}
          representantsLists={props.representantsLists}
          setRepresentantsLists={props.setRepresentantsLists}
        />
      </div>
    </SharedHeightContainer>
  </React.Fragment>
);
