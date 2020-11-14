/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { InstanceId, OrganismeId, RepresentantListId } from '../../domain/id';
import { Dict } from '../../domain/nominal-class';
import { Representant, RepresentantOrSuppleant } from '../../domain/organisme';
import { AddRepresentantComponent } from './AddRepresentantComponent';
import { DragableRepresentantsListComponent } from './DragableRepresentantsListComponent';

export const EditRepresentantsListComponent = (props: {
  organismeId: OrganismeId;
  instanceId: InstanceId | undefined;
  representantOrSuppleant: RepresentantOrSuppleant;
  representantsLists: Dict<RepresentantListId, Representant[]>;
  setRepresentantsLists: (
    lists: Dict<RepresentantListId, Representant[]>
  ) => void;
}) => (
  <React.Fragment>
    <DragableRepresentantsListComponent
      organismeId={props.organismeId}
      instanceId={props.instanceId}
      representantOrSuppleant={props.representantOrSuppleant}
      representantsLists={props.representantsLists}
      setRepresentantsLists={props.setRepresentantsLists}
    />
    <AddRepresentantComponent
      organismeId={props.organismeId}
      instanceId={props.instanceId}
      representantOrSuppleant={props.representantOrSuppleant}
      representantsLists={props.representantsLists}
      setRepresentantsLists={props.setRepresentantsLists}
    />
  </React.Fragment>
);
